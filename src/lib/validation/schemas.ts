import { z } from "zod";
import { numberField, nonNegativeNumberField, positiveNumberField } from "./common";

/* ---------------------------------- Lab 1 --------------------------------- */

export const lab1FieldSchemas = {
	k1: numberField({ min: 1, max: 15, label: "К1" }),
	k2: numberField({ min: 1, max: 15, label: "К2" }),
	k3: numberField({ min: 1, max: 15, label: "К3" }),
	kp: numberField({ min: 1, max: 200, label: "КП" }),
	r: numberField({ min: 0, max: 10, label: "Показник Rᵢ" }),
	z: numberField({ min: 0.1, max: 5, label: "Z" }),
} as const;

/* ---------------------------------- Lab 2 --------------------------------- */

export const lab2FieldSchemas = {
	loc: nonNegativeNumberField("Обсяг функції (LOC)"),
	th: positiveNumberField("Tₕ"),
	coefficient: numberField({ min: 0.1, max: 5, label: "Коефіцієнт" }),
	days: nonNegativeNumberField("Кількість днів"),
	years: numberField({ min: 0.1, max: 20, label: "Тривалість (роки)" }),
} as const;

/* ---------------------------------- Lab 3 --------------------------------- */

export const lab3Schema = z.object({
	mode: z.enum(["basic", "detailed"]),
	regime: z.enum(["organic", "semidetached", "embedded"]),
	size: positiveNumberField("Обсяг проекту (KLOC)"),
	acap: numberField({ min: 0.5, max: 1.5, label: "ACAP" }),
	pcap: numberField({ min: 0.5, max: 1.5, label: "PCAP" }),
	lexp: numberField({ min: 0.5, max: 1.5, label: "LEXP" }),
	rely: numberField({ min: 0.5, max: 1.5, label: "RELY" }),
	data: numberField({ min: 0.5, max: 1.5, label: "DATA" }),
});
export type Lab3Input = z.infer<typeof lab3Schema>;

/* ---------------------------------- Lab 4 --------------------------------- */

export const apiKeySchema = z
	.string()
	.trim()
	.min(1, "Введіть API ключ")
	.max(200, "Ключ занадто довгий")
	.refine((val) => /^[!-~]+$/.test(val), "Ключ містить пробіли або неприпустимі символи");

export const lab4FieldSchemas = {
	det: numberField({ min: 0, max: 500, integer: true, label: "DET" }),
	ret: numberField({ min: 0, max: 50, integer: true, label: "RET" }),
	ftr: numberField({ min: 0, max: 50, integer: true, label: "FTR" }),
	vaf: numberField({ min: 0.5, max: 2, label: "VAF" }),
} as const;

/* ---------------------------------- Lab 5 --------------------------------- */

export const lab5FieldSchemas = {
	sloc: positiveNumberField("SLOC"),
	scaleFactor: numberField({ min: 0, max: 10, label: "Фактор масштабу" }),
	driver: numberField({ min: 0.3, max: 1.6, label: "Драйвер витрат" }),
	rate: nonNegativeNumberField("Ставка"),
	share: numberField({ min: 0, max: 100, label: "Частка (%)" }),
} as const;

/* ---------------------------------- Lab 6 --------------------------------- */

export const lab6FieldSchemas = {
	forms: numberField({ min: 0, max: 10000, integer: true, label: "Кількість форм" }),
	percent: numberField({ min: 0, max: 1, label: "Відсоток (0.0–1.0)" }),
	avgModule: positiveNumberField("Середній модуль (SLOC)"),
	percentageMetric: numberField({ min: 0, max: 100, label: "Відсоток (%)" }),
	scaleFactor: numberField({ min: 0, max: 10, label: "Фактор масштабу" }),
	driver: numberField({ min: 0.3, max: 1.6, label: "Драйвер витрат" }),
	rate: nonNegativeNumberField("Ставка"),
	share: numberField({ min: 0, max: 100, label: "Частка (%)" }),
} as const;
