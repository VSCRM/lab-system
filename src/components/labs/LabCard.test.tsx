import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { I18nextProvider } from "react-i18next";
import i18n from "@/i18n";
import LabCard from "./LabCard";
import { LABS } from "@/constants/labs";

function renderCard(lab: (typeof LABS)[number], index: number) {
	return render(
		<I18nextProvider i18n={i18n}>
			<MemoryRouter>
				<LabCard lab={lab} index={index} />
			</MemoryRouter>
		</I18nextProvider>,
	);
}

describe("LabCard", () => {
	it("links to the correct /lab/:slug route", () => {
		const lab = LABS[0]!;
		const title = i18n.t(`labs.${lab.slug}.title`, { lng: "uk" });
		renderCard(lab, 0);
		expect(screen.getByRole("link", { name: new RegExp(title) })).toHaveAttribute("href", `/lab/${lab.slug}`);
	});

	it("renders the translated lab title and subtitle", () => {
		const lab = LABS[1]!;
		const title = i18n.t(`labs.${lab.slug}.title`, { lng: "uk" });
		const subtitle = i18n.t(`labs.${lab.slug}.subtitle`, { lng: "uk" });
		renderCard(lab, 1);
		expect(screen.getByText(title)).toBeInTheDocument();
		expect(screen.getByText(subtitle)).toBeInTheDocument();
	});
});
