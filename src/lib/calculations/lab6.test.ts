import { describe, it, expect } from "vitest";
import { estimatedSloc, modificationPercentages, equivalentSloc, computeLab6 } from "./lab6";
import { nominalCostDrivers } from "@/constants/cocomo";

describe("lab6: estimatedSloc", () => {
	it("computes design + new SLOC contributions", () => {
		const result = estimatedSloc({ designForms: 50, designPercent: 0.2, newForms: 30, avgModule: 4000 });
		expect(result.slocDesign).toBe(50 * 4000 * 0.2);
		expect(result.slocNew).toBe(30 * 4000);
		expect(result.totalSloc).toBe(result.slocDesign + result.slocNew);
		expect(result.ksloc).toBeCloseTo(result.totalSloc / 1000, 6);
	});
});

describe("lab6: modificationPercentages", () => {
	it("computes DM/CM/IM as percentages of avgModule", () => {
		const result = modificationPercentages({ slocp: 250, sloci: 150, slocr: 150, avgModule: 4000 });
		expect(result.dm).toBeCloseTo(6.25, 6);
		expect(result.cm).toBeCloseTo(3.75, 6);
		expect(result.im).toBeCloseTo(3.75, 6);
	});
});

describe("lab6: equivalentSloc", () => {
	it("applies the AA + SU + weighted DM/CM/IM formula", () => {
		const esloc = equivalentSloc({ avgModule: 4000, aa: 1, su: 5, dm: 10, cm: 10, im: 10 });
		// (1 + 5 + 0.4*10 + 0.3*10 + 0.3*10) = 16
		expect(esloc).toBeCloseTo((4000 * 16) / 100, 6);
	});
});

describe("lab6: computeLab6 (integration)", () => {
	const baseInput = {
		designForms: 50,
		designPercent: 0.2,
		newForms: 30,
		avgModule: 4000,
		slocp: 250,
		sloci: 150,
		slocr: 150,
		aa: 1,
		su: 5,
		scaleFactors: { prec: 1.24, flex: 1.01, resl: 1.41, team: 1.1, pmat: 1.56 },
		drivers: nominalCostDrivers(),
		staff: [{ role: "Dev", rate: 2500, share: 100 }],
	};

	it("totalFormCount is design + new forms", () => {
		expect(computeLab6(baseInput).totalFormCount).toBe(80);
	});

	it("effort applies the 0.45x reuse multiplier relative to a plain COCOMO run", () => {
		const result = computeLab6(baseInput);
		const naiveEffort = 2.94 * Math.pow(result.totalEslocKsloc, result.e) * result.eaf;
		expect(result.effort).toBeCloseTo(naiveEffort * 0.45, 6);
	});

	it("staffing does not apply any extra overhead multiplier (unlike Lab 5)", () => {
		const result = computeLab6(baseInput);
		expect(result.staffing).toBeCloseTo(result.effort / result.duration, 6);
	});
});
