import { useMemo, useState } from "react";
import type { ScaleFactors, CostDrivers, ScaleFactorKey, CostDriverKey } from "@/constants/cocomo";
import { validateField } from "@/lib/validation/common";
import { lab5FieldSchemas } from "@/lib/validation/schemas";

export interface UseCocomoDriversResult {
	scaleFactors: ScaleFactors;
	drivers: CostDrivers;
	scaleFactorRaw: Record<ScaleFactorKey, string>;
	driverRaw: Record<CostDriverKey, string>;
	scaleFactorErrors: Record<ScaleFactorKey, string | null>;
	driverErrors: Record<CostDriverKey, string | null>;
	updateScaleFactor: (key: ScaleFactorKey, raw: string) => void;
	updateDriver: (key: CostDriverKey, raw: string) => void;
}

function toRawRecord<K extends string>(record: Record<K, number>): Record<K, string> {
	return Object.fromEntries(Object.entries(record).map(([k, v]) => [k, String(v)])) as Record<K, string>;
}

/**
 * Manages the 5 scale-factor and 17 cost-driver inputs shared by Lab 5/6,
 * validating every keystroke against the same Zod schemas used everywhere
 * else in the app (previously these grids bypassed validation entirely).
 */
export function useCocomoDrivers(initialScaleFactors: ScaleFactors, initialDrivers: CostDrivers): UseCocomoDriversResult {
	const [scaleFactorRaw, setScaleFactorRaw] = useState<Record<ScaleFactorKey, string>>(() => toRawRecord(initialScaleFactors));
	const [driverRaw, setDriverRaw] = useState<Record<CostDriverKey, string>>(() => toRawRecord(initialDrivers));

	const scaleFactors = useMemo(() => {
		const result = {} as ScaleFactors;
		for (const key of Object.keys(scaleFactorRaw) as ScaleFactorKey[]) {
			const { success, value } = validateField(lab5FieldSchemas.scaleFactor, scaleFactorRaw[key]);
			result[key] = success ? value : (initialScaleFactors[key] ?? 0);
		}
		return result;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [scaleFactorRaw]);

	const scaleFactorErrors = useMemo(() => {
		const result = {} as Record<ScaleFactorKey, string | null>;
		for (const key of Object.keys(scaleFactorRaw) as ScaleFactorKey[]) {
			result[key] = validateField(lab5FieldSchemas.scaleFactor, scaleFactorRaw[key]).error;
		}
		return result;
	}, [scaleFactorRaw]);

	const drivers = useMemo(() => {
		const result = {} as CostDrivers;
		for (const key of Object.keys(driverRaw) as CostDriverKey[]) {
			const { success, value } = validateField(lab5FieldSchemas.driver, driverRaw[key]);
			result[key] = success ? value : (initialDrivers[key] ?? 1);
		}
		return result;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [driverRaw]);

	const driverErrors = useMemo(() => {
		const result = {} as Record<CostDriverKey, string | null>;
		for (const key of Object.keys(driverRaw) as CostDriverKey[]) {
			result[key] = validateField(lab5FieldSchemas.driver, driverRaw[key]).error;
		}
		return result;
	}, [driverRaw]);

	const updateScaleFactor = (key: ScaleFactorKey, raw: string) => {
		setScaleFactorRaw((prev) => ({ ...prev, [key]: raw }));
	};

	const updateDriver = (key: CostDriverKey, raw: string) => {
		setDriverRaw((prev) => ({ ...prev, [key]: raw }));
	};

	return { scaleFactors, drivers, scaleFactorRaw, driverRaw, scaleFactorErrors, driverErrors, updateScaleFactor, updateDriver };
}
