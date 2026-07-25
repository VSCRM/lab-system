import { describe, it, expect } from "vitest";
import { selectedCodeVolume, totalLaborDays, effectiveTimeFund, requiredStaffCount, computeLab2, type CatalogFunction } from "./lab2";

const FUNCTIONS: CatalogFunction[] = [
	{ id: 1, name: "A", loc: 100, enabled: true },
	{ id: 2, name: "B", loc: 200, enabled: false },
	{ id: 3, name: "C", loc: 300, enabled: true },
];

describe("lab2: selectedCodeVolume", () => {
	it("sums LOC only for enabled functions", () => {
		expect(selectedCodeVolume(FUNCTIONS)).toBe(400);
	});

	it("returns 0 when nothing is enabled", () => {
		expect(selectedCodeVolume(FUNCTIONS.map((f) => ({ ...f, enabled: false })))).toBe(0);
	});
});

describe("lab2: totalLaborDays", () => {
	it("multiplies th * kc * kt * kh", () => {
		expect(totalLaborDays({ th: 100, kc: 2, kt: 0.5, kh: 1 })).toBe(100);
	});
});

describe("lab2: effectiveTimeFund", () => {
	it("subtracts holidays, weekends, and vacation from the year", () => {
		expect(effectiveTimeFund({ daysInYear: 365, holidays: 11, weekends: 104, vacation: 31 })).toBe(219);
	});
});

describe("lab2: requiredStaffCount", () => {
	it("divides total labor days by (effective fund * plan years)", () => {
		expect(requiredStaffCount(2190, 219, 1)).toBeCloseTo(10, 6);
	});

	it("scales down proportionally with more plan years", () => {
		expect(requiredStaffCount(2190, 219, 2)).toBeCloseTo(5, 6);
	});
});

describe("lab2: computeLab2 (integration)", () => {
	it("is internally consistent for known inputs", () => {
		const result = computeLab2({
			functions: FUNCTIONS,
			th: 692,
			kc: 1.25,
			kt: 0.9,
			kh: 1.0,
			daysInYear: 365,
			holidays: 11,
			weekends: 104,
			vacation: 31,
			planYears: 1,
		});
		expect(result.v3).toBe(400);
		expect(result.tef).toBe(219);
		expect(result.staffCount).toBeGreaterThan(0);
	});
});
