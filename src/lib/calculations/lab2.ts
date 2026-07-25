export interface CatalogFunction {
	id: number;
	name: string;
	loc: number;
	enabled: boolean;
}

export interface Lab2Input {
	functions: CatalogFunction[];
	th: number;
	kc: number;
	kt: number;
	kh: number;
	daysInYear: number;
	holidays: number;
	weekends: number;
	vacation: number;
	planYears: number;
}

export interface Lab2Result {
	v3: number;
	t3: number;
	tef: number;
	staffCount: number;
}

/** V₃ = сума LOC усіх активних функцій каталогу. */
export function selectedCodeVolume(functions: readonly CatalogFunction[]): number {
	return functions.filter((f) => f.enabled).reduce((sum, f) => sum + f.loc, 0);
}

/** T₃ = Tₕ × Kc × Kт × Kₕ (людино-днів) */
export function totalLaborDays({ th, kc, kt, kh }: Pick<Lab2Input, "th" | "kc" | "kt" | "kh">): number {
	return th * kc * kt * kh;
}

/** Ефективний фонд часу = Дні_у_році - Свята - Вихідні - Відпустка */
export function effectiveTimeFund({
	daysInYear,
	holidays,
	weekends,
	vacation,
}: Pick<Lab2Input, "daysInYear" | "holidays" | "weekends" | "vacation">): number {
	return daysInYear - holidays - weekends - vacation;
}

/** Ч = T₃ / (Ф_ЕФ × Tₚ) */
export function requiredStaffCount(totalDays: number, effectiveFund: number, planYears: number): number {
	return totalDays / (effectiveFund * planYears);
}

export function computeLab2(input: Lab2Input): Lab2Result {
	const v3 = selectedCodeVolume(input.functions);
	const t3 = totalLaborDays(input);
	const tef = effectiveTimeFund(input);
	const staffCount = requiredStaffCount(t3, tef, input.planYears);
	return { v3, t3, tef, staffCount };
}
