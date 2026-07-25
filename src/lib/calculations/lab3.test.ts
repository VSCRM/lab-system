import { describe, it, expect } from "vitest";
import { basicEffort, effortAdjustmentFactor, developmentTime, averageStaffing, productivity, computeLab3 } from "./lab3";
import { COCOMO_BASIC_MODES } from "@/constants/cocomo";

describe("lab3: basicEffort", () => {
	it("uses the organic mode coefficients", () => {
		const { a, b } = COCOMO_BASIC_MODES.organic;
		expect(basicEffort(50, "organic")).toBeCloseTo(a * Math.pow(50, b), 6);
	});

	it("produces more effort for embedded than organic at the same size", () => {
		expect(basicEffort(100, "embedded")).toBeGreaterThan(basicEffort(100, "organic"));
	});
});

describe("lab3: effortAdjustmentFactor", () => {
	it("multiplies all five drivers together", () => {
		expect(effortAdjustmentFactor({ acap: 0.86, pcap: 0.7, lexp: 0.95, rely: 1.0, data: 1.0 })).toBeCloseTo(0.86 * 0.7 * 0.95, 6);
	});

	it("returns 1 when all drivers are nominal", () => {
		expect(effortAdjustmentFactor({ acap: 1, pcap: 1, lexp: 1, rely: 1, data: 1 })).toBe(1);
	});
});

describe("lab3: developmentTime / averageStaffing / productivity", () => {
	it("computes TDEV = c * E^d", () => {
		const { c, d } = COCOMO_BASIC_MODES.organic;
		expect(developmentTime(20, "organic")).toBeCloseTo(c * Math.pow(20, d), 6);
	});

	it("computes staffing as effort/tdev and productivity as size/effort", () => {
		expect(averageStaffing(20, 10)).toBe(2);
		expect(productivity(100, 20)).toBe(5);
	});
});

describe("lab3: computeLab3 (integration)", () => {
	it("detailed mode effort equals basic effort * EAF", () => {
		const input = {
			mode: "detailed" as const,
			regime: "semidetached" as const,
			size: 55,
			acap: 0.86,
			pcap: 0.7,
			lexp: 0.95,
			rely: 1,
			data: 1,
		};
		const result = computeLab3(input);
		expect(result.eDetailed).toBeCloseTo(result.eBasic * result.eaf, 6);
		expect(result.currentE).toBeCloseTo(result.eDetailed, 6);
	});

	it("basic mode ignores the EAF for currentE", () => {
		const input = { mode: "basic" as const, regime: "organic" as const, size: 20, acap: 0.5, pcap: 0.5, lexp: 0.5, rely: 0.5, data: 0.5 };
		const result = computeLab3(input);
		expect(result.currentE).toBeCloseTo(result.eBasic, 6);
	});
});
