import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SelectField from "./SelectField";

describe("SelectField", () => {
	const options = [
		{ value: "organic", label: "Органічний" },
		{ value: "embedded", label: "Впроваджений" },
	] as const;

	it("renders all options and reflects the selected value", () => {
		render(<SelectField label="Режим" value="organic" onChange={() => {}} options={options} />);
		expect(screen.getByLabelText("Режим")).toHaveValue("organic");
		expect(screen.getByRole("option", { name: "Впроваджений" })).toBeInTheDocument();
	});

	it("calls onChange when a new option is selected", async () => {
		const user = userEvent.setup();
		const handleChange = vi.fn();
		render(<SelectField label="Режим" value="organic" onChange={handleChange} options={options} />);
		await user.selectOptions(screen.getByLabelText("Режим"), "embedded");
		expect(handleChange).toHaveBeenCalled();
	});
});
