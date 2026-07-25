import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Lab1 from "./Lab1";

describe("Lab1 (smoke test — full render + user interaction)", () => {
	it("renders with sensible default values and a computed result", () => {
		render(<Lab1 />);
		expect(screen.getByLabelText(/К1 - Масштаб об'єкту автоматизації/)).toHaveValue(10);
		// The final result section should show a labor-cost figure in labor-months.
		expect(screen.getByText(/T ≈ .+ людино-місяців/)).toBeInTheDocument();
	});

	it("recomputes the result when the user edits an input", async () => {
		const user = userEvent.setup();
		render(<Lab1 />);

		const resultBefore = screen.getByText(/T ≈ .+ людино-місяців/).textContent;

		const k1Input = screen.getByLabelText(/К1 - Масштаб об'єкту автоматизації/);
		await user.clear(k1Input);
		await user.type(k1Input, "5");

		const resultAfter = screen.getByText(/T ≈ .+ людино-місяців/).textContent;
		expect(resultAfter).not.toBe(resultBefore);
	});

	it("shows a validation error and does not crash when an out-of-range value is entered", async () => {
		const user = userEvent.setup();
		render(<Lab1 />);

		const k1Input = screen.getByLabelText(/К1 - Масштаб об'єкту автоматизації/);
		await user.clear(k1Input);
		await user.type(k1Input, "999");

		expect(screen.getByRole("alert")).toHaveTextContent(/максимум/i);
		// The result section still renders (no crash) even with an invalid field.
		expect(screen.getByText(/T ≈ .+ людино-місяців/)).toBeInTheDocument();
	});
});
