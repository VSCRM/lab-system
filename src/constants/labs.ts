import type { ComponentType, SVGProps } from "react";
import { Calculator, Book, Zap, LineChart, ScanSearch, Boxes } from "lucide-react";

export type LabSlug =
	| "trudomistkist"
	| "chyselnist-vykonavtsiv"
	| "cocomo-vartist"
	| "funkcionalni-tochky"
	| "cocomo-post-architecture"
	| "rozmir-programnoi-chastyny";

export interface LabMeta {
	id: number;
	slug: LabSlug;
	icon: ComponentType<SVGProps<SVGSVGElement>>;
	color: string;
}

export const LABS: readonly LabMeta[] = [
	{
		id: 1,
		slug: "trudomistkist",
		icon: Calculator,
		color: "#FFD700",
	},
	{
		id: 2,
		slug: "chyselnist-vykonavtsiv",
		icon: LineChart,
		color: "#0057B7",
	},
	{
		id: 3,
		slug: "cocomo-vartist",
		icon: Zap,
		color: "#FFD700",
	},
	{
		id: 4,
		slug: "funkcionalni-tochky",
		icon: ScanSearch,
		color: "#0057B7",
	},
	{
		id: 5,
		slug: "cocomo-post-architecture",
		icon: Book,
		color: "#FFD700",
	},
	{
		id: 6,
		slug: "rozmir-programnoi-chastyny",
		icon: Boxes,
		color: "#0057B7",
	},
] as const;

export function getLabBySlug(slug: string | undefined): LabMeta | undefined {
	return LABS.find((lab) => lab.slug === slug);
}

export function getLabById(id: number): LabMeta | undefined {
	return LABS.find((lab) => lab.id === id);
}
