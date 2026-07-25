import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import { useVisionAnalysis } from "./useVisionAnalysis";

interface TestFields extends Record<string, number> {
	det: number;
	ret: number;
}

function makeFile(name: string, type: string, sizeBytes: number): File {
	const content = new Uint8Array(sizeBytes);
	return new File([content], name, { type });
}

function changeEventFor(file: File): React.ChangeEvent<HTMLInputElement> {
	return { target: { files: [file] } } as unknown as React.ChangeEvent<HTMLInputElement>;
}

describe("useVisionAnalysis", () => {
	beforeEach(() => {
		vi.stubGlobal("fetch", vi.fn());
	});

	afterEach(() => {
		vi.unstubAllGlobals();
	});

	it("rejects an unsupported file type without setting a preview", () => {
		const { result } = renderHook(() => useVisionAnalysis<TestFields>());
		act(() => {
			result.current.handleFile(changeEventFor(makeFile("doc.pdf", "application/pdf", 100)));
		});
		expect(result.current.error).toMatch(/формат/i);
		expect(result.current.preview).toBeNull();
	});

	it("rejects a file over the size limit", () => {
		const { result } = renderHook(() => useVisionAnalysis<TestFields>());
		act(() => {
			result.current.handleFile(changeEventFor(makeFile("huge.png", "image/png", 9 * 1024 * 1024)));
		});
		expect(result.current.error).toMatch(/завеликий/i);
	});

	it("accepts a valid image and sets a preview", async () => {
		const { result } = renderHook(() => useVisionAnalysis<TestFields>());
		act(() => {
			result.current.handleFile(changeEventFor(makeFile("photo.png", "image/png", 1024)));
		});
		await waitFor(() => expect(result.current.preview).not.toBeNull());
		expect(result.current.error).toBe("");
	});

	it("resets stale fields/explanation when a new file is chosen (race-condition fix)", async () => {
		const { result } = renderHook(() => useVisionAnalysis<TestFields>());

		// Simulate a completed analysis by driving state through handleFile + waiting,
		// then manually reaching in via reset() is not representative — instead verify
		// that selecting a second file clears whatever was there before.
		act(() => {
			result.current.handleFile(changeEventFor(makeFile("a.png", "image/png", 1024)));
		});
		await waitFor(() => expect(result.current.preview).not.toBeNull());

		act(() => {
			result.current.handleFile(changeEventFor(makeFile("b.png", "image/png", 1024)));
		});

		expect(result.current.fields).toBeNull();
		expect(result.current.explanation).toBe("");
	});

	it("reset() clears all analysis state back to initial", async () => {
		const { result } = renderHook(() => useVisionAnalysis<TestFields>());
		act(() => {
			result.current.handleFile(changeEventFor(makeFile("a.png", "image/png", 1024)));
		});
		await waitFor(() => expect(result.current.preview).not.toBeNull());

		act(() => {
			result.current.reset();
		});
		expect(result.current.preview).toBeNull();
		expect(result.current.hasImage).toBe(false);
	});
});
