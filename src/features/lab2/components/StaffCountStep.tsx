import { Trans, useTranslation } from "react-i18next";
import Section from "@/components/ui/Section";
import NumberField from "@/components/ui/NumberField";
import type { UseValidatedNumberResult } from "@/hooks/useValidatedNumber";
import { formatNumber } from "@/lib/format";

interface StaffCountStepProps {
	tk: UseValidatedNumberResult;
	ts: UseValidatedNumberResult;
	tv: UseValidatedNumberResult;
	to: UseValidatedNumberResult;
	tp: UseValidatedNumberResult;
	t3: number;
	tef: number;
	staffCount: number;
}

/** Крок 4: розрахунок ефективного фонду часу та необхідної чисельності виконавців. */
export default function StaffCountStep({ tk, ts, tv, to, tp, t3, tef, staffCount }: StaffCountStepProps) {
	const { t } = useTranslation("lab2");

	return (
		<Section title={t("staffCount.stepTitle")}>
			<div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
				<NumberField label={t("staffCount.daysInYearLabel")} value={tk.raw} onChange={tk.onChange} error={tk.error} size="sm" />
				<NumberField label={t("staffCount.holidaysLabel")} value={ts.raw} onChange={ts.onChange} error={ts.error} size="sm" />
				<NumberField label={t("staffCount.weekendsLabel")} value={tv.raw} onChange={tv.onChange} error={tv.error} size="sm" />
				<NumberField label={t("staffCount.vacationLabel")} value={to.raw} onChange={to.onChange} error={to.error} size="sm" />
			</div>

			<div className="bg-slate-900/50 rounded-xl p-4 sm:p-6 font-mono space-y-4">
				<div className="border-b border-blue-500/20 pb-4">
					<div className="text-blue-300 text-sm mb-1">{t("staffCount.effectiveFundLabel")}</div>
					<div className="text-lg sm:text-xl text-white break-words">
						<Trans t={t} i18nKey="staffCount.effectiveFundResult" values={{ tk: tk.value, ts: ts.value, tv: tv.value, to: to.value }} />{" "}
						<span className="text-yellow-400 font-bold">
							{formatNumber(tef, 0)} {t("staffCount.daysSuffix")}
						</span>
					</div>
				</div>

				<div>
					<div className="text-blue-300 text-sm mb-1">{t("staffCount.staffLabel")}</div>
					<div className="text-sm text-slate-400 mb-2">{t("staffCount.staffFormula")}</div>
					<div className="text-white text-base sm:text-lg break-words">
						<Trans t={t} i18nKey="staffCount.staffStep" values={{ t3: formatNumber(t3), tef: formatNumber(tef, 0), tp: tp.value }} />
						<span className="text-2xl sm:text-3xl text-yellow-400 font-black ml-2 sm:ml-3">
							{Math.ceil(staffCount)} {t("staffCount.peopleSuffix")}
						</span>
					</div>
					<div className="text-[10px] text-slate-500 mt-1 italic">{t("staffCount.exactValue", { value: formatNumber(staffCount, 3) })}</div>
				</div>
			</div>
		</Section>
	);
}
