export interface Lab1Input {
	k1: number;
	k2: number;
	k3: number;
	kp: number;
	ratings: number[];
	z: number;
}

export interface Lab1Result {
	fr: number;
	rk: number;
	sumR: number;
	e: number;
	t: number;
}

/** ФР = (К1 + К2 + К3)^2.35 */
export function functionalSize({ k1, k2, k3 }: Pick<Lab1Input, "k1" | "k2" | "k3">): number {
	return Math.pow(k1 + k2 + k3, 2.35);
}

/** РК = ФР × КП / 1000 (KLOC) */
export function codeVolume(functionalSizeValue: number, kp: number): number {
	return (functionalSizeValue * kp) / 1000;
}

/** E = 0.91 + 0.01 × ΣRᵢ */
export function developmentExponent(ratings: number[]): { sum: number; exponent: number } {
	const sum = ratings.reduce((acc, r) => acc + r, 0);
	return { sum, exponent: 0.91 + 0.01 * sum };
}

/** T = 2.94 × (РК)^E × Z */
export function laborCost(rk: number, exponent: number, z: number): number {
	return 2.94 * Math.pow(rk, exponent) * z;
}

export function computeLab1(input: Lab1Input): Lab1Result {
	const fr = functionalSize(input);
	const rk = codeVolume(fr, input.kp);
	const { sum: sumR, exponent: e } = developmentExponent(input.ratings);
	const t = laborCost(rk, e, input.z);
	return { fr, rk, sumR, e, t };
}
