import { describe, it, expect } from "vitest";
import { ilfComplexity, eqComplexity, unadjustedFunctionPoints, adjustedFunctionPoints, computeLab4, extractJsonObject } from "./lab4";

describe("lab4: ilfComplexity (IFPUG table)", () => {
	it("classifies low DET / low RET as Низька, 7 FP", () => {
		expect(ilfComplexity(10, 1)).toEqual({ level: "low", fp: 7 });
	});

	it("classifies high DET / low RET as Висока, 15 FP", () => {
		expect(ilfComplexity(51, 1)).toEqual({ level: "high", fp: 15 });
	});

	it("bumps complexity up a tier when RET > 3", () => {
		expect(ilfComplexity(10, 4)).toEqual({ level: "medium", fp: 10 });
	});
});

describe("lab4: eqComplexity (IFPUG table)", () => {
	it("classifies low DET / low FTR as Низька, 3 FP", () => {
		expect(eqComplexity(3, 1)).toEqual({ level: "low", fp: 3 });
	});

	it("classifies high DET / high FTR as Висока, 6 FP", () => {
		expect(eqComplexity(16, 4)).toEqual({ level: "high", fp: 6 });
	});
});

describe("lab4: UFT / AFT", () => {
	it("UFT is the sum of ILF and EQ function points", () => {
		expect(unadjustedFunctionPoints(10, 4)).toBe(14);
	});

	it("AFT scales UFT by VAF", () => {
		expect(adjustedFunctionPoints(14, 1.1)).toBeCloseTo(15.4, 6);
	});
});

describe("lab4: computeLab4 (integration)", () => {
	it("combines ILF + EQ into a final AFT", () => {
		const result = computeLab4({ ilfDet: 10, ilfRet: 1, eqDet: 3, eqFtr: 1, vaf: 1 });
		expect(result.uft).toBe(result.ilf.fp + result.eq.fp);
		expect(result.aft).toBeCloseTo(result.uft, 6);
	});
});

describe("lab4: extractJsonObject", () => {
	it("parses a clean JSON object", () => {
		expect(extractJsonObject('{"det":5,"ret":1}')).toEqual({ det: 5, ret: 1 });
	});

	it("extracts JSON embedded in surrounding prose", () => {
		expect(extractJsonObject('Here is the answer: {"det":5,"ret":1} — hope that helps!')).toEqual({ det: 5, ret: 1 });
	});

	it("returns null for non-JSON text", () => {
		expect(extractJsonObject("no json here")).toBeNull();
	});

	it("returns null for a JSON array (not an object)", () => {
		expect(extractJsonObject("[1,2,3]")).toBeNull();
	});
});
