import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ErrorBoundary from "./ErrorBoundary";

const reportError = vi.fn();
vi.mock("@/lib/monitoring", () => ({
	reportError: (...args: unknown[]) => reportError(...args),
}));

function Bomb(): never {
	throw new Error("boom");
}

describe("ErrorBoundary", () => {
	afterEach(() => {
		reportError.mockClear();
	});

	it("renders children normally when nothing throws", () => {
		render(
			<ErrorBoundary>
				<div>All good</div>
			</ErrorBoundary>,
		);
		expect(screen.getByText("All good")).toBeInTheDocument();
	});

	it("renders the fallback UI when a child throws", () => {
		// React logs the error to the console during the throw — suppress the noisy output for this test.
		const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
		render(
			<ErrorBoundary>
				<Bomb />
			</ErrorBoundary>,
		);
		expect(screen.getByText("Щось пішло не так")).toBeInTheDocument();
		expect(reportError).toHaveBeenCalledTimes(1);
		consoleSpy.mockRestore();
	});

	it("calls onReset and clears the fallback when the reset button is clicked", async () => {
		const user = userEvent.setup();
		const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

		// React may invoke a throwing component's render function more than
		// once internally before committing the error, so the throw-flag must
		// only flip on the explicit user action (reset), never as a render
		// side-effect, or this test becomes flaky.
		let throwErrors = true;
		const onReset = vi.fn(() => {
			throwErrors = false;
		});
		function MaybeBomb() {
			if (throwErrors) throw new Error("boom once");
			return <div>Recovered</div>;
		}

		render(
			<ErrorBoundary onReset={onReset}>
				<MaybeBomb />
			</ErrorBoundary>,
		);
		expect(screen.getByText("Щось пішло не так")).toBeInTheDocument();

		await user.click(screen.getByRole("button", { name: "Повернутися до списку" }));
		expect(onReset).toHaveBeenCalledTimes(1);
		expect(screen.getByText("Recovered")).toBeInTheDocument();
		consoleSpy.mockRestore();
	});
});
