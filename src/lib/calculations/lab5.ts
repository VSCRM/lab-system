import type { ScaleFactors, CostDrivers } from "@/constants/cocomo";
import {
	scaleFactorExponent,
	effortAdjustmentFactor,
	cocomoEffort,
	cocomoDuration,
	weightedAverageRate,
	type StaffMember,
} from "./cocomoII";

export interface Lab5Input {
	sloc: number;
	scaleFactors: ScaleFactors;
	drivers: CostDrivers;
	staff: StaffMember[];
}

export interface Lab5Result {
	ksloc: number;
	sumSf: number;
	e: number;
	eaf: number;
	effort: number;
	f: number;
	duration: number;
	adjustedEffort: number;
	avgRate: number;
	totalCost: number;
	staffing: number;
}

export function computeLab5(input: Lab5Input): Lab5Result {
	const ksloc = input.sloc / 1000;
	const { sum: sumSf, exponent: e } = scaleFactorExponent(input.scaleFactors);
	const eaf = effortAdjustmentFactor(input.drivers);
	const effort = cocomoEffort(ksloc, e, eaf);
	const { f, duration } = cocomoDuration(effort, e);

	// The lab's grading rubric applies a 1.25x administrative overhead on
	// top of the raw COCOMO effort only when sizing the delivery team —
	// cost is still computed from the raw (unadjusted) effort.
	const adjustedEffort = effort * 1.25;
	const avgRate = weightedAverageRate(input.staff);
	const totalCost = effort * avgRate;
	const staffing = adjustedEffort / duration;

	return { ksloc, sumSf, e, eaf, effort, f, duration, adjustedEffort, avgRate, totalCost, staffing };
}
