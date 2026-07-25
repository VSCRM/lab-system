import type { ScaleFactors, CostDrivers } from "@/constants/cocomo";
import {
	scaleFactorExponent,
	effortAdjustmentFactor,
	cocomoEffort,
	cocomoDuration,
	weightedAverageRate,
	type StaffMember,
} from "./cocomoII";

export interface Lab6Input {
	designForms: number;
	designPercent: number;
	newForms: number;
	avgModule: number;
	slocp: number;
	sloci: number;
	slocr: number;
	aa: number;
	su: number;
	scaleFactors: ScaleFactors;
	drivers: CostDrivers;
	staff: StaffMember[];
}

export interface SlocEstimate {
	slocDesign: number;
	slocNew: number;
	totalSloc: number;
	ksloc: number;
}

export interface ModificationPercentages {
	dm: number;
	cm: number;
	im: number;
}

export interface Lab6Result extends SlocEstimate, ModificationPercentages {
	esloc: number;
	totalFormCount: number;
	totalEslocKsloc: number;
	sumSf: number;
	e: number;
	eaf: number;
	effort: number;
	f: number;
	duration: number;
	avgRate: number;
	totalCost: number;
	staffing: number;
}

/** SLOC contributed by forms being redesigned vs. brand-new forms. */
export function estimatedSloc({
	designForms,
	designPercent,
	newForms,
	avgModule,
}: Pick<Lab6Input, "designForms" | "designPercent" | "newForms" | "avgModule">): SlocEstimate {
	const slocDesign = designForms * avgModule * designPercent;
	const slocNew = newForms * avgModule * 1.0;
	const totalSloc = slocDesign + slocNew;
	return { slocDesign, slocNew, totalSloc, ksloc: totalSloc / 1000 };
}

/** DM/CM/IM modification percentages relative to an average module size. */
export function modificationPercentages({
	slocp,
	sloci,
	slocr,
	avgModule,
}: Pick<Lab6Input, "slocp" | "sloci" | "slocr" | "avgModule">): ModificationPercentages {
	return {
		dm: (slocp / avgModule) * 100,
		cm: (sloci / avgModule) * 100,
		im: (slocr / avgModule) * 100,
	};
}

/** ESLOC = AvgModule × (AA + SU + 0.4·DM + 0.3·CM + 0.3·IM) / 100 */
export function equivalentSloc({
	avgModule,
	aa,
	su,
	dm,
	cm,
	im,
}: {
	avgModule: number;
	aa: number;
	su: number;
	dm: number;
	cm: number;
	im: number;
}): number {
	return (avgModule * (aa + su + 0.4 * dm + 0.3 * cm + 0.3 * im)) / 100;
}

export function computeLab6(input: Lab6Input): Lab6Result {
	const { slocDesign, slocNew, totalSloc, ksloc } = estimatedSloc(input);
	const { dm, cm, im } = modificationPercentages(input);
	const esloc = equivalentSloc({ avgModule: input.avgModule, aa: input.aa, su: input.su, dm, cm, im });
	const totalFormCount = input.designForms + input.newForms;
	const totalEslocKsloc = (totalFormCount * esloc) / 1000;

	const { sum: sumSf, exponent: e } = scaleFactorExponent(input.scaleFactors);
	const eaf = effortAdjustmentFactor(input.drivers);
	// This lab's rubric scales nominal COCOMO effort by 0.45 to account for
	// the heavy code-reuse baked into the ESLOC figure above.
	const effort = cocomoEffort(totalEslocKsloc, e, eaf, 0.45);
	const { f, duration } = cocomoDuration(effort, e);

	const avgRate = weightedAverageRate(input.staff);
	const totalCost = effort * avgRate;
	const staffing = effort / duration;

	return {
		slocDesign,
		slocNew,
		totalSloc,
		ksloc,
		dm,
		cm,
		im,
		esloc,
		totalFormCount,
		totalEslocKsloc,
		sumSf,
		e,
		eaf,
		effort,
		f,
		duration,
		avgRate,
		totalCost,
		staffing,
	};
}
