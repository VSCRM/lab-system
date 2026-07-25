import { describe, it, expect } from "vitest";
import { functionalSize, codeVolume, developmentExponent, laborCost, computeLab1 } from "./lab1";

describe("lab1: functionalSize", () => {
	it("computes (k1+k2+k3)^2.35", () => {
		expect(functionalSize({ k1: 10, k2: 14, k3: 8 })).toBeCloseTo(Math.pow(32, 2.35), 6);
	});
});

describe("lab1: codeVolume", () => {
	it("scales functional size by kp/1000", () => {
		expect(codeVolume(1000, 53)).toBeCloseTo(53, 6);
	});
});

describe("lab1: developmentExponent", () => {
	it("sums ratings and applies 0.91 + 0.01*sum", () => {
		const { sum, exponent } = developmentExponent([1, 2, 3, 4, 5]);
		expect(sum).toBe(15);
		expect(exponent).toBeCloseTo(0.91 + 0.15, 6);
	});

	it("returns the nominal exponent for an empty rating list", () => {
		expect(developmentExponent([]).exponent).toBeCloseTo(0.91, 6);
	});
});

describe("lab1: laborCost", () => {
	it("computes 2.94 * rk^e * z", () => {
		expect(laborCost(10, 1, 1)).toBeCloseTo(29.4, 6);
	});
});

describe("lab1: computeLab1 (integration)", () => {
	it("produces internally consistent results for known inputs", () => {
		const result = computeLab1({ k1: 10, k2: 14, k3: 8, kp: 53, ratings: [3.72, 3.04, 4.24, 3.29, 4.68], z: 1 });
		expect(result.fr).toBeCloseTo(functionalSize({ k1: 10, k2: 14, k3: 8 }), 6);
		expect(result.rk).toBeCloseTo(codeVolume(result.fr, 53), 6);
		expect(result.t).toBeGreaterThan(0);
		expect(Number.isFinite(result.t)).toBe(true);
	});
});
