import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NumberField from "./NumberField";

describe("NumberField", () => {
	it("renders the label and current value", () => {
		render(<NumberField label="К1" value="10" onChange={() => {}} />);
		expect(screen.getByLabelText("К1")).toHaveValue(10);
	});

	it("calls onChange when the user types", async () => {
		const user = userEvent.setup();
		const handleChange = vi.fn();
		render(<NumberField label="К1" value="1" onChange={handleChange} />);
		await user.type(screen.getByLabelText("К1"), "2");
		expect(handleChange).toHaveBeenCalled();
	});

	it("shows an error message and marks the field aria-invalid", () => {
		render(<NumberField label="К1" value="999" onChange={() => {}} error="К1: максимум 15" />);
		const input = screen.getByLabelText("К1");
		expect(input).toHaveAttribute("aria-invalid", "true");
		expect(screen.getByRole("alert")).toHaveTextContent("К1: максимум 15");
	});

	it("shows the hint instead of an error when there is no error", () => {
		render(<NumberField label="К1" value="10" onChange={() => {}} hint="Діапазон: 1-15" />);
		expect(screen.getByText("Діапазон: 1-15")).toBeInTheDocument();
		expect(screen.queryByRole("alert")).not.toBeInTheDocument();
	});

	it("disables the input when disabled is passed", () => {
		render(<NumberField label="К1" value="10" onChange={() => {}} disabled />);
		expect(screen.getByLabelText("К1")).toBeDisabled();
	});
});
