import { useTranslation } from "react-i18next";
import { COCOMO_II_COST_DRIVERS, type CostDriverKey } from "@/constants/cocomo";
import FormulaBlock from "@/components/ui/FormulaBlock";
import { formatNumber } from "@/lib/format";

interface CostDriverGridProps {
	raw: Record<CostDriverKey, string>;
	errors: Record<CostDriverKey, string | null>;
	onChange: (key: CostDriverKey, raw: string) => void;
	eaf: number;
	helperText?: string;
}

/**
 * Editable grid of the 17 COCOMO II effort cost drivers. Shared by Lab 5 and
 * Lab 6. Each field is Zod-validated (0.3-1.6 range) with inline errors.
 */
export default function CostDriverGrid({ raw, errors, onChange, eaf, helperText }: CostDriverGridProps) {
	const { t } = useTranslation("cocomo");

	return (
		<>
			{helperText && <p className="text-sm text-blue-300 bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 mb-4">{helperText}</p>}

			<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
				{COCOMO_II_COST_DRIVERS.map((key) => {
					const error = errors[key];
					return (
						<div key={key}>
							<div className="flex items-center gap-2">
								<label htmlFor={`cd-${key}`} className="text-blue-300 w-16 uppercase shrink-0">
									{key}:
								</label>
								<input
									id={`cd-${key}`}
									type="number"
									step="0.01"
									value={raw[key]}
									onChange={(e) => onChange(key, e.target.value)}
									aria-invalid={Boolean(error)}
									className={`flex-1 bg-slate-900 border rounded px-2 py-1 text-white outline-none ${
										error ? "border-red-500/70" : "border-blue-500/30 focus:border-yellow-400"
									}`}
								/>
							</div>
							{error && <p className="field-error ml-[4.5rem]">{error}</p>}
						</div>
					);
				})}
			</div>

			<div className="mt-4">
				<FormulaBlock formula={t("costDrivers.formula")} result={t("costDrivers.result", { value: formatNumber(eaf, 4) })} />
			</div>
		</>
	);
}
