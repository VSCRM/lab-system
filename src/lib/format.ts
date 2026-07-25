function isFiniteNumber(value: number): boolean {
	return typeof value === "number" && Number.isFinite(value);
}

/** Format a number with a fixed number of decimals; falls back to "—" for NaN/Infinity. */
export function formatNumber(value: number, decimals = 2): string {
	if (!isFiniteNumber(value)) return "—";
	return value.toFixed(decimals);
}

/** Format an integer with thousands separators (e.g. "12 480"). */
export function formatInteger(value: number): string {
	if (!isFiniteNumber(value)) return "—";
	return new Intl.NumberFormat("uk-UA").format(Math.round(value));
}

/** Format a value in thousands with a trailing unit label, e.g. "12.3 тис." */
export function formatThousands(value: number, suffix = "тис."): string {
	if (!isFiniteNumber(value)) return "—";
	return `${(value / 1000).toFixed(1)} ${suffix}`;
}

/** Clamp a number between min and max (inclusive). */
export function clamp(value: number, min: number, max: number): number {
	return Math.min(Math.max(value, min), max);
}
