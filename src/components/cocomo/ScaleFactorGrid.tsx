import { useTranslation } from "react-i18next";
import { COCOMO_II_SCALE_FACTORS, type ScaleFactorKey } from "@/constants/cocomo";
import FormulaBlock from "@/components/ui/FormulaBlock";
import { formatNumber } from "@/lib/format";

interface ScaleFactorGridProps {
	raw: Record<ScaleFactorKey, string>;
	errors: Record<ScaleFactorKey, string | null>;
	onChange: (key: ScaleFactorKey, raw: string) => void;
	sum: number;
	exponent: number;
}

/**
 * Editable grid of the 5 COCOMO II scale factors (PREC/FLEX/RESL/TEAM/PMAT)
 * plus the derived exponent formula block. Shared by Lab 5 and Lab 6.
 * Each field is Zod-validated (0-10 range) with inline error messages.
 */
export default function ScaleFactorGrid({ raw, errors, onChange, sum, exponent }: ScaleFactorGridProps) {
	const { t } = useTranslation("cocomo");

	return (
		<>
			<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
				{COCOMO_II_SCALE_FACTORS.map((key) => {
					const error = errors[key];
					return (
						<div key={key}>
							<label htmlFor={`sf-${key}`} className="block text-xs text-blue-300 mb-1">
								{t(`scaleFactors.${key}`)}
							</label>
							<input
								id={`sf-${key}`}
								type="number"
								step="0.01"
								value={raw[key]}
								onChange={(e) => onChange(key, e.target.value)}
								aria-invalid={Boolean(error)}
								className={`w-full bg-slate-900 border rounded px-3 py-2 text-white text-sm outline-none ${
									error ? "border-red-500/70" : "border-blue-500/30 focus:border-yellow-400"
								}`}
							/>
							{error && <p className="field-error">{error}</p>}
						</div>
					);
				})}
			</div>

			<div className="mt-4">
				<FormulaBlock
					formula={t("scaleFactors.sumFormula")}
					result={t("scaleFactors.sumResult", { value: formatNumber(exponent, 4) })}
					steps={[t("scaleFactors.sumStep", { sum: formatNumber(sum) })]}
				/>
			</div>
		</>
	);
}
