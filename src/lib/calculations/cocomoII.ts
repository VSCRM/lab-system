import type { CostDrivers, ScaleFactors } from "@/constants/cocomo";

export interface StaffMember {
	role: string;
	rate: number;
	share: number;
}

/** COCOMO II Post-Architecture exponent: E = 0.91 + 0.01 * ΣSF */
export function scaleFactorExponent(scaleFactors: ScaleFactors): { sum: number; exponent: number } {
	const sum = Object.values(scaleFactors).reduce((acc: number, val: number) => acc + val, 0);
	return { sum, exponent: 0.91 + 0.01 * sum };
}

/** Effort Adjustment Factor: product of all 17 cost drivers. */
export function effortAdjustmentFactor(drivers: CostDrivers): number {
	return Object.values(drivers).reduce((acc: number, val: number) => acc * val, 1);
}

/** Nominal COCOMO II effort equation: Effort = 2.94 * (KSLOC)^E * EAF */
export function cocomoEffort(ksloc: number, exponent: number, eaf: number, scaleMultiplier = 1): number {
	return 2.94 * Math.pow(ksloc, exponent) * eaf * scaleMultiplier;
}

/** Development time: TDEV = 3.67 * Effort^F, where F = 0.28 + 0.2 * (E - 0.91) */
export function cocomoDuration(effort: number, exponent: number): { f: number; duration: number } {
	const f = 0.28 + 0.2 * (exponent - 0.91);
	return { f, duration: 3.67 * Math.pow(effort, f) };
}

/**
 * Weighted average rate across a staff allocation table. Normalizes by the
 * *actual* sum of shares (not a hardcoded 100) so the result stays correct
 * even if the table doesn't sum to exactly 100% — the UI still warns the
 * user when that happens, but the math itself never silently skews.
 */
export function weightedAverageRate(staff: readonly StaffMember[]): number {
	const total = totalSharePercent(staff);
	if (total <= 0) return 0;
	return staff.reduce((acc, member) => acc + member.rate * member.share, 0) / total;
}

export function totalSharePercent(staff: readonly StaffMember[]): number {
	return staff.reduce((sum, member) => sum + member.share, 0);
}
