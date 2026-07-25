import { describe, it, expect } from "vitest";
import { formatNumber, formatInteger, formatThousands, clamp } from "./format";

describe("formatNumber", () => {
	it("formats with the requested decimals", () => {
		expect(formatNumber(3.14159, 2)).toBe("3.14");
	});

	it("falls back to em-dash for NaN/Infinity instead of printing garbage", () => {
		expect(formatNumber(NaN)).toBe("—");
		expect(formatNumber(Infinity)).toBe("—");
	});
});

describe("formatInteger", () => {
	it("rounds and adds thousands separators", () => {
		expect(formatInteger(12480.6)).toBe(new Intl.NumberFormat("uk-UA").format(12481));
	});

	it("falls back to em-dash for invalid numbers", () => {
		expect(formatInteger(NaN)).toBe("—");
	});
});

describe("formatThousands", () => {
	it("divides by 1000 and appends the suffix", () => {
		expect(formatThousands(12345)).toBe("12.3 тис.");
	});
});

describe("clamp", () => {
	it("clamps values into the given range", () => {
		expect(clamp(5, 0, 10)).toBe(5);
		expect(clamp(-5, 0, 10)).toBe(0);
		expect(clamp(15, 0, 10)).toBe(10);
	});
});
