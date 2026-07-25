import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Alert from "./Alert";

describe("Alert", () => {
	it("uses role=alert for the error variant", () => {
		render(<Alert variant="error">Помилка</Alert>);
		expect(screen.getByRole("alert")).toHaveTextContent("Помилка");
	});

	it("uses role=status for info/success variants (non-interrupting)", () => {
		render(<Alert variant="info">Інфо</Alert>);
		expect(screen.getByRole("status")).toHaveTextContent("Інфо");
		expect(screen.queryByRole("alert")).not.toBeInTheDocument();
	});
});
