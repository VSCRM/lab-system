export type DevelopmentMode = "organic" | "semidetached" | "embedded";

export interface CocomoBasicCoefficients {
	a: number;
	b: number;
	c: number;
	d: number;
}

/**
 * COCOMO Basic model coefficients per development mode.
 * E = a * (KSLOC)^b
 * TDEV = c * (E)^d
 */
export const COCOMO_BASIC_MODES: Record<DevelopmentMode, CocomoBasicCoefficients> = {
	organic: { a: 2.4, b: 1.05, c: 2.5, d: 0.38 },
	semidetached: { a: 3.0, b: 1.12, c: 2.5, d: 0.35 },
	embedded: { a: 2.8, b: 1.2, c: 2.5, d: 0.32 },
};

export type ScaleFactorKey = "prec" | "flex" | "resl" | "team" | "pmat";

export const COCOMO_II_SCALE_FACTORS: readonly ScaleFactorKey[] = ["prec", "flex", "resl", "team", "pmat"] as const;

export type CostDriverKey =
	| "rely"
	| "data"
	| "cplx"
	| "ruse"
	| "docu"
	| "time"
	| "stor"
	| "pvol"
	| "acap"
	| "pcap"
	| "pcon"
	| "apex"
	| "plex"
	| "ltex"
	| "tool"
	| "site"
	| "sced";

export const COCOMO_II_COST_DRIVERS: readonly CostDriverKey[] = [
	"rely",
	"data",
	"cplx",
	"ruse",
	"docu",
	"time",
	"stor",
	"pvol",
	"acap",
	"pcap",
	"pcon",
	"apex",
	"plex",
	"ltex",
	"tool",
	"site",
	"sced",
] as const;

export type ScaleFactors = Record<ScaleFactorKey, number>;
export type CostDrivers = Record<CostDriverKey, number>;

export function nominalCostDrivers(): CostDrivers {
	return COCOMO_II_COST_DRIVERS.reduce((acc, key) => {
		acc[key] = 1.0;
		return acc;
	}, {} as CostDrivers);
}
