import { describe, it, expect } from "vitest";
import { numberField, positiveNumberField, nonNegativeNumberField, validateField } from "./common";

describe("numberField", () => {
	it("accepts a value within range", () => {
		const schema = numberField({ min: 1, max: 15, label: "К1" });
		expect(schema.safeParse("10").success).toBe(true);
	});

	it("rejects a value below the minimum", () => {
		const schema = numberField({ min: 1, max: 15, label: "К1" });
		const result = schema.safeParse("0");
		expect(result.success).toBe(false);
	});

	it("rejects a value above the maximum", () => {
		const schema = numberField({ min: 1, max: 15, label: "К1" });
		expect(schema.safeParse("16").success).toBe(false);
	});

	it("rejects non-numeric input", () => {
		const schema = numberField({ label: "X" });
		expect(schema.safeParse("abc").success).toBe(false);
	});

	it("rejects non-integer input when integer: true", () => {
		const schema = numberField({ integer: true, label: "DET" });
		expect(schema.safeParse("5.5").success).toBe(false);
		expect(schema.safeParse("5").success).toBe(true);
	});
});

describe("positiveNumberField / nonNegativeNumberField", () => {
	it("positive rejects zero", () => {
		expect(positiveNumberField("X").safeParse("0").success).toBe(false);
	});

	it("nonNegative accepts zero", () => {
		expect(nonNegativeNumberField("X").safeParse("0").success).toBe(true);
	});

	it("nonNegative rejects negative numbers", () => {
		expect(nonNegativeNumberField("X").safeParse("-1").success).toBe(false);
	});
});

describe("validateField", () => {
	it("returns success with the coerced numeric value", () => {
		const result = validateField(numberField({ min: 0, max: 10, label: "X" }), "5");
		expect(result.success).toBe(true);
		expect(result.value).toBe(5);
		expect(result.error).toBeNull();
	});

	it("returns a human-readable error on failure", () => {
		const result = validateField(numberField({ min: 0, max: 10, label: "X" }), "abc");
		expect(result.success).toBe(false);
		expect(result.error).not.toBeNull();
	});
});
