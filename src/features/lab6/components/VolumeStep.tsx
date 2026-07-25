import { useTranslation } from "react-i18next";
import Section from "@/components/ui/Section";
import NumberField from "@/components/ui/NumberField";
import type { UseValidatedNumberResult } from "@/hooks/useValidatedNumber";
import { formatNumber } from "@/lib/format";

interface VolumeStepProps {
	designForms: UseValidatedNumberResult;
	designPercent: UseValidatedNumberResult;
	newForms: UseValidatedNumberResult;
	avgModule: UseValidatedNumberResult;
	slocDesign: number;
	slocNew: number;
	totalSloc: number;
	ksloc: number;
}

/** Крок 1: розрахунок обсягу коду (KSLOC) з форм зміни дизайну та нових макетів. */
export default function VolumeStep({
	designForms,
	designPercent,
	newForms,
	avgModule,
	slocDesign,
	slocNew,
	totalSloc,
	ksloc,
}: VolumeStepProps) {
	const { t } = useTranslation("lab6");

	return (
		<Section title={t("volumeStep.stepTitle")}>
			<div className="grid sm:grid-cols-2 gap-4 mb-4">
				<NumberField
					label={t("volumeStep.designFormsLabel")}
					value={designForms.raw}
					onChange={designForms.onChange}
					error={designForms.error}
				/>
				<NumberField
					label={t("volumeStep.designPercentLabel")}
					value={designPercent.raw}
					onChange={designPercent.onChange}
					error={designPercent.error}
					step="0.01"
					hint={t("volumeStep.designPercentHint")}
				/>
			</div>
			<div className="grid sm:grid-cols-2 gap-4 mb-4">
				<NumberField label={t("volumeStep.newFormsLabel")} value={newForms.raw} onChange={newForms.onChange} error={newForms.error} />
				<NumberField label={t("volumeStep.avgModuleLabel")} value={avgModule.raw} onChange={avgModule.onChange} error={avgModule.error} />
			</div>

			<div className="bg-slate-900/50 rounded-lg p-4 font-mono text-xs sm:text-sm space-y-2 overflow-x-auto">
				<div className="text-blue-300">
					{t("volumeStep.slocDesignLine", {
						forms: designForms.value,
						avgModule: avgModule.value,
						percent: designPercent.value,
						value: formatNumber(slocDesign, 0),
					})}
				</div>
				<div className="text-blue-300">
					{t("volumeStep.slocNewLine", { forms: newForms.value, avgModule: avgModule.value, value: formatNumber(slocNew, 0) })}
				</div>
				<div className="text-white text-base sm:text-lg mt-2">
					{t("volumeStep.totalSlocLine", { slocDesign: formatNumber(slocDesign, 0), slocNew: formatNumber(slocNew, 0) })}{" "}
					<span className="text-yellow-400 font-bold">{formatNumber(totalSloc, 0)} SLOC</span>
				</div>
				<div className="text-white text-lg sm:text-xl mt-2">
					<span className="text-yellow-400 font-bold">{t("volumeStep.ksloc", { value: formatNumber(ksloc) })}</span>
				</div>
			</div>
		</Section>
	);
}
