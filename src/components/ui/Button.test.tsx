import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "./Button";

describe("Button", () => {
	it("renders children and responds to clicks", async () => {
		const user = userEvent.setup();
		const onClick = vi.fn();
		render(<Button onClick={onClick}>Розрахувати</Button>);
		await user.click(screen.getByRole("button", { name: "Розрахувати" }));
		expect(onClick).toHaveBeenCalledTimes(1);
	});

	it("shows the loading label and disables the button while loading", () => {
		render(
			<Button loading loadingLabel="Аналізую...">
				Аналізувати
			</Button>,
		);
		expect(screen.getByRole("button")).toBeDisabled();
		expect(screen.getByText("Аналізую...")).toBeInTheDocument();
		expect(screen.queryByText("Аналізувати")).not.toBeInTheDocument();
	});

	it("does not fire onClick while disabled", async () => {
		const user = userEvent.setup();
		const onClick = vi.fn();
		render(
			<Button onClick={onClick} disabled>
				Розрахувати
			</Button>,
		);
		await user.click(screen.getByRole("button"));
		expect(onClick).not.toHaveBeenCalled();
	});
});
