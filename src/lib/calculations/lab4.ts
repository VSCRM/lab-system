// Language-neutral so the calculation module has no locale concerns —
// the UI layer maps these to translated labels for display.
export type ComplexityLevel = "low" | "medium" | "high";

export interface ComplexityResult {
	level: ComplexityLevel;
	fp: number;
}

export interface Lab4Input {
	ilfDet: number;
	ilfRet: number;
	eqDet: number;
	eqFtr: number;
	vaf: number;
}

export interface Lab4Result {
	ilf: ComplexityResult;
	eq: ComplexityResult;
	uft: number;
	aft: number;
}

/** ILF (Internal Logical File) complexity/FP lookup (IFPUG table). */
export function ilfComplexity(det: number, ret: number): ComplexityResult {
	const pick = (low: ComplexityLevel, mid: ComplexityLevel, high: ComplexityLevel): ComplexityLevel =>
		det <= 19 ? low : det <= 50 ? mid : high;
	const pickFp = (low: number, mid: number, high: number): number => (det <= 19 ? low : det <= 50 ? mid : high);

	if (ret <= 3) {
		return { level: pick("low", "medium", "high"), fp: pickFp(7, 10, 15) };
	}
	return { level: pick("medium", "high", "high"), fp: pickFp(10, 15, 15) };
}

/** EQ (External Query) complexity/FP lookup (IFPUG table). */
export function eqComplexity(det: number, ftr: number): ComplexityResult {
	const pick = (low: ComplexityLevel, mid: ComplexityLevel, high: ComplexityLevel): ComplexityLevel =>
		det <= 5 ? low : det <= 15 ? mid : high;
	const pickFp = (low: number, mid: number, high: number): number => (det <= 5 ? low : det <= 15 ? mid : high);

	if (ftr <= 3) {
		return { level: pick("low", "medium", "high"), fp: pickFp(3, 4, 6) };
	}
	return { level: pick("medium", "high", "high"), fp: pickFp(4, 6, 6) };
}

/** UFT = ILF_fp + EQ_fp (unadjusted function points) */
export function unadjustedFunctionPoints(ilfFp: number, eqFp: number): number {
	return ilfFp + eqFp;
}

/** AFT = UFT × VAF (value-adjusted function points) */
export function adjustedFunctionPoints(uft: number, vaf: number): number {
	return uft * vaf;
}

export function computeLab4({ ilfDet, ilfRet, eqDet, eqFtr, vaf }: Lab4Input): Lab4Result {
	const ilf = ilfComplexity(ilfDet, ilfRet);
	const eq = eqComplexity(eqDet, eqFtr);
	const uft = unadjustedFunctionPoints(ilf.fp, eq.fp);
	const aft = adjustedFunctionPoints(uft, vaf);
	return { ilf, eq, uft, aft };
}

/** Extract the first valid JSON object from a free-form LLM text response. */
export function extractJsonObject(text: string): Record<string, unknown> | null {
	const match = text.match(/\{[\s\S]*\}/);
	if (!match) return null;
	try {
		const parsed: unknown = JSON.parse(match[0]);
		if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
			return parsed as Record<string, unknown>;
		}
		return null;
	} catch {
		return null;
	}
}
