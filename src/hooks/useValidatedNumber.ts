import { useMemo, useState, useCallback, type ChangeEvent } from "react";
import type { z } from "zod";
import { validateField } from "@/lib/validation/common";

export interface UseValidatedNumberResult {
	raw: string;
	value: number;
	error: string | null;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
	setValue: (next: number) => void;
}

/**
 * Manages a single numeric field: keeps the raw text the user typed (so
 * partial input like "1." or "-" isn't fought), plus a validated numeric
 * value derived through a Zod schema, plus a human-readable error string.
 */
export function useValidatedNumber(initialValue: number, schema: z.ZodTypeAny): UseValidatedNumberResult {
	const [raw, setRaw] = useState(String(initialValue));

	const { value, error } = useMemo(() => {
		if (raw.trim() === "") {
			return { value: 0, error: "Обов'язкове поле" };
		}
		const result = validateField(schema, raw);
		return {
			value: result.success ? result.value : Number(raw) || 0,
			error: result.success ? null : result.error,
		};
	}, [raw, schema]);

	const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		setRaw(event.target.value);
	}, []);

	const setValue = useCallback((next: number) => {
		setRaw(String(next));
	}, []);

	return { raw, value, error, onChange, setValue };
}
