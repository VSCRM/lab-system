import { z } from "zod";

export interface NumberFieldOptions {
	min?: number;
	max?: number;
	label?: string;
	integer?: boolean;
}

/**
 * Build a Zod schema for a bounded numeric input field. Centralizes the
 * "must be a finite number within range" rule so every lab gets consistent
 * validation and error copy instead of re-deriving it per field.
 */
export function numberField({
	min = -Infinity,
	max = Infinity,
	label = "Значення",
	integer = false,
}: NumberFieldOptions = {}): z.ZodNumber {
	let schema = z.coerce.number({ invalid_type_error: `${label}: введіть число` }).finite(`${label}: число має бути скінченним`);

	if (integer) {
		schema = schema.int(`${label}: має бути цілим числом`);
	}
	if (min !== -Infinity) {
		schema = schema.min(min, `${label}: мінімум ${min}`);
	}
	if (max !== Infinity) {
		schema = schema.max(max, `${label}: максимум ${max}`);
	}
	return schema;
}

/** A positive numeric field (> 0). */
export const positiveNumberField = (label: string): z.ZodNumber => numberField({ min: 0.000001, label });

/** A non-negative numeric field (>= 0). */
export const nonNegativeNumberField = (label: string): z.ZodNumber => numberField({ min: 0, label });

export interface FieldValidationResult {
	success: boolean;
	value: number;
	error: string | null;
}

/**
 * Safely validate a single field value against a Zod schema, returning a
 * discriminated result object instead of throwing.
 */
export function validateField(schema: z.ZodTypeAny, rawValue: unknown): FieldValidationResult {
	const result = schema.safeParse(rawValue);
	if (result.success) {
		return { success: true, value: result.data as number, error: null };
	}
	return {
		success: false,
		value: typeof rawValue === "number" ? rawValue : Number(rawValue) || 0,
		error: result.error.issues[0]?.message ?? "Некоректне значення",
	};
}
