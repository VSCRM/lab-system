import { describe, it, expect } from "vitest";
import { computeLab5 } from "./lab5";
import { nominalCostDrivers } from "@/constants/cocomo";

describe("lab5: computeLab5 (integration)", () => {
	const baseInput = {
		sloc: 5000,
		scaleFactors: { prec: 5.33, flex: 3.04, resl: 4.24, team: 3.29, pmat: 6.68 },
		drivers: nominalCostDrivers(),
		staff: [{ role: "Dev", rate: 3000, share: 100 }],
	};

	it("converts SLOC to KSLOC", () => {
		expect(computeLab5(baseInput).ksloc).toBe(5);
	});

	it("adjustedEffort is 1.25x the raw effort (team overhead)", () => {
		const result = computeLab5(baseInput);
		expect(result.adjustedEffort).toBeCloseTo(result.effort * 1.25, 6);
	});

	it("totalCost is based on the RAW effort, not the 1.25x-adjusted one", () => {
		const result = computeLab5(baseInput);
		expect(result.totalCost).toBeCloseTo(result.effort * result.avgRate, 6);
		expect(result.totalCost).not.toBeCloseTo(result.adjustedEffort * result.avgRate, 6);
	});

	it("staffing uses the adjusted effort over duration", () => {
		const result = computeLab5(baseInput);
		expect(result.staffing).toBeCloseTo(result.adjustedEffort / result.duration, 6);
	});

	it("more SLOC produces more effort", () => {
		const small = computeLab5({ ...baseInput, sloc: 1000 }).effort;
		const large = computeLab5({ ...baseInput, sloc: 10000 }).effort;
		expect(large).toBeGreaterThan(small);
	});
});
