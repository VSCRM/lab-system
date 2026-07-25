import { COCOMO_BASIC_MODES, type CocomoBasicCoefficients, type DevelopmentMode } from "@/constants/cocomo";

export type CocomoModelMode = "basic" | "detailed";

export interface Lab3Input {
	mode: CocomoModelMode;
	regime: DevelopmentMode;
	size: number;
	acap: number;
	pcap: number;
	lexp: number;
	rely: number;
	data: number;
}

export interface Lab3Result {
	coef: CocomoBasicCoefficients;
	eBasic: number;
	eaf: number;
	eDetailed: number;
	currentE: number;
	tdev: number;
	ss: number;
	p: number;
}

/** E (basic) = a × Size^b */
export function basicEffort(size: number, mode: DevelopmentMode): number {
	const { a, b } = COCOMO_BASIC_MODES[mode];
	return a * Math.pow(size, b);
}

/** EAF (simplified detailed model) = ACAP × PCAP × LEXP × RELY × DATA */
export function effortAdjustmentFactor({
	acap,
	pcap,
	lexp,
	rely,
	data,
}: Pick<Lab3Input, "acap" | "pcap" | "lexp" | "rely" | "data">): number {
	return acap * pcap * lexp * rely * data;
}

/** TDEV = c × E^d */
export function developmentTime(effort: number, mode: DevelopmentMode): number {
	const { c, d } = COCOMO_BASIC_MODES[mode];
	return c * Math.pow(effort, d);
}

/** SS = E / TDEV (average staffing) */
export function averageStaffing(effort: number, tdev: number): number {
	return effort / tdev;
}

/** P = Size / E (productivity) */
export function productivity(size: number, effort: number): number {
	return size / effort;
}

export function computeLab3(input: Lab3Input): Lab3Result {
	const coef = COCOMO_BASIC_MODES[input.regime];
	const eBasic = basicEffort(input.size, input.regime);
	const eaf = effortAdjustmentFactor(input);
	const eDetailed = eBasic * eaf;
	const currentE = input.mode === "basic" ? eBasic : eDetailed;
	const tdev = developmentTime(currentE, input.regime);
	const ss = averageStaffing(currentE, tdev);
	const p = productivity(input.size, currentE);

	return { coef, eBasic, eaf, eDetailed, currentE, tdev, ss, p };
}
