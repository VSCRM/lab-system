import { describe, it, expect } from "vitest";
import {
	scaleFactorExponent,
	effortAdjustmentFactor,
	cocomoEffort,
	cocomoDuration,
	weightedAverageRate,
	totalSharePercent,
} from "./cocomoII";
import { nominalCostDrivers } from "@/constants/cocomo";

describe("cocomoII: scaleFactorExponent", () => {
	it("computes E = 0.91 + 0.01*sum", () => {
		const { sum, exponent } = scaleFactorExponent({ prec: 1, flex: 1, resl: 1, team: 1, pmat: 1 });
		expect(sum).toBe(5);
		expect(exponent).toBeCloseTo(0.96, 6);
	});
});

describe("cocomoII: effortAdjustmentFactor", () => {
	it("returns 1 for all-nominal drivers", () => {
		expect(effortAdjustmentFactor(nominalCostDrivers())).toBe(1);
	});
});

describe("cocomoII: cocomoEffort / cocomoDuration", () => {
	it("computes nominal effort with EAF=1, multiplier=1", () => {
		expect(cocomoEffort(10, 1, 1)).toBeCloseTo(29.4, 6);
	});

	it("applies the optional scale multiplier (used by Lab 6's 0.45x)", () => {
		expect(cocomoEffort(10, 1, 1, 0.45)).toBeCloseTo(29.4 * 0.45, 6);
	});

	it("computes duration from effort and exponent", () => {
		const { duration } = cocomoDuration(30, 1);
		expect(duration).toBeGreaterThan(0);
	});
});

describe("cocomoII: weightedAverageRate (bug fix — normalizes by actual share sum)", () => {
	it("matches the simple average when shares sum to 100", () => {
		const staff = [
			{ role: "A", rate: 100, share: 50 },
			{ role: "B", rate: 200, share: 50 },
		];
		expect(weightedAverageRate(staff)).toBeCloseTo(150, 6);
	});

	it("stays correct even when shares do NOT sum to 100 (previously silently wrong)", () => {
		const staff = [
			{ role: "A", rate: 100, share: 25 },
			{ role: "B", rate: 200, share: 25 },
		];
		// Old buggy behavior divided by hardcoded 100 → would have returned 75.
		// Correct weighted average of two equally-weighted rates is 150.
		expect(weightedAverageRate(staff)).toBeCloseTo(150, 6);
	});

	it("returns 0 for an empty or zero-share table instead of dividing by zero", () => {
		expect(weightedAverageRate([])).toBe(0);
		expect(weightedAverageRate([{ role: "A", rate: 100, share: 0 }])).toBe(0);
	});
});

describe("cocomoII: totalSharePercent", () => {
	it("sums all share percentages", () => {
		expect(
			totalSharePercent([
				{ role: "A", rate: 1, share: 30 },
				{ role: "B", rate: 1, share: 70 },
			]),
		).toBe(100);
	});
});
