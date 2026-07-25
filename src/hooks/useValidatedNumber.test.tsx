import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useValidatedNumber } from "./useValidatedNumber";
import { numberField } from "@/lib/validation/common";

describe("useValidatedNumber", () => {
	const schema = numberField({ min: 1, max: 15, label: "К1" });

	it("initializes raw and value from the given initial number", () => {
		const { result } = renderHook(() => useValidatedNumber(10, schema));
		expect(result.current.raw).toBe("10");
		expect(result.current.value).toBe(10);
		expect(result.current.error).toBeNull();
	});

	it("updates raw and value on a valid change", () => {
		const { result } = renderHook(() => useValidatedNumber(10, schema));
		act(() => {
			result.current.onChange({ target: { value: "12" } } as React.ChangeEvent<HTMLInputElement>);
		});
		expect(result.current.raw).toBe("12");
		expect(result.current.value).toBe(12);
		expect(result.current.error).toBeNull();
	});

	it("surfaces a validation error for an out-of-range value, but keeps a numeric fallback", () => {
		const { result } = renderHook(() => useValidatedNumber(10, schema));
		act(() => {
			result.current.onChange({ target: { value: "999" } } as React.ChangeEvent<HTMLInputElement>);
		});
		expect(result.current.error).not.toBeNull();
		expect(result.current.value).toBe(999); // Number(raw) fallback, not silently clamped
	});

	it("treats an empty field as a required-field error with a 0 fallback", () => {
		const { result } = renderHook(() => useValidatedNumber(10, schema));
		act(() => {
			result.current.onChange({ target: { value: "" } } as React.ChangeEvent<HTMLInputElement>);
		});
		expect(result.current.error).not.toBeNull();
		expect(result.current.value).toBe(0);
	});

	it("does not error on non-numeric garbage without crashing, and reports an error", () => {
		const { result } = renderHook(() => useValidatedNumber(10, schema));
		act(() => {
			result.current.onChange({ target: { value: "abc" } } as React.ChangeEvent<HTMLInputElement>);
		});
		expect(result.current.error).not.toBeNull();
	});

	it("setValue programmatically updates raw", () => {
		const { result } = renderHook(() => useValidatedNumber(10, schema));
		act(() => {
			result.current.setValue(7);
		});
		expect(result.current.raw).toBe("7");
		expect(result.current.value).toBe(7);
	});
});
