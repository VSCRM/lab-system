import { useTranslation } from "react-i18next";
import Section from "@/components/ui/Section";
import NumberField from "@/components/ui/NumberField";
import type { UseValidatedNumberResult } from "@/hooks/useValidatedNumber";
import { formatNumber } from "@/lib/format";

interface ModificationAndEslocStepProps {
	slocp: UseValidatedNumberResult;
	sloci: UseValidatedNumberResult;
	slocr: UseValidatedNumberResult;
	aa: UseValidatedNumberResult;
	su: UseValidatedNumberResult;
	dm: number;
	cm: number;
	im: number;
	esloc: number;
	totalEslocKsloc: number;
	totalFormCount: number;
}

/** Крок 2-3: відсотки модифікації (DM/CM/IM) та еквівалентний обсяг (ESLOC). */
export default function ModificationAndEslocStep({
	slocp,
	sloci,
	slocr,
	aa,
	su,
	dm,
	cm,
	im,
	esloc,
	totalEslocKsloc,
	totalFormCount,
}: ModificationAndEslocStepProps) {
	const { t } = useTranslation("lab6");

	return (
		<>
			<Section title={t("modificationStep.stepTitle")}>
				<div className="grid sm:grid-cols-3 gap-4">
					<NumberField label={t("modificationStep.slocpLabel")} value={slocp.raw} onChange={slocp.onChange} error={slocp.error} />
					<NumberField label={t("modificationStep.slociLabel")} value={sloci.raw} onChange={sloci.onChange} error={sloci.error} />
					<NumberField label={t("modificationStep.slocrLabel")} value={slocr.raw} onChange={slocr.onChange} error={slocr.error} />
				</div>

				<div className="bg-slate-900/50 rounded-lg p-4 font-mono text-xs sm:text-sm mt-4 space-y-1 overflow-x-auto">
					<div className="text-blue-300">{t("modificationStep.dmLine", { value: formatNumber(dm) })}</div>
					<div className="text-blue-300">{t("modificationStep.cmLine", { value: formatNumber(cm) })}</div>
					<div className="text-blue-300">{t("modificationStep.imLine", { value: formatNumber(im) })}</div>
				</div>
			</Section>

			<Section title={t("eslocStep.stepTitle")}>
				<div className="grid sm:grid-cols-2 gap-4 mb-4">
					<NumberField label={t("eslocStep.aaLabel")} value={aa.raw} onChange={aa.onChange} error={aa.error} />
					<NumberField label={t("eslocStep.suLabel")} value={su.raw} onChange={su.onChange} error={su.error} />
				</div>

				<div className="bg-slate-900/50 rounded-lg p-4 font-mono text-xs sm:text-sm">
					<div className="text-blue-300 mb-2">{t("eslocStep.formula")}</div>
					<div className="text-2xl font-bold text-yellow-400 mt-3">{t("eslocStep.esloc", { value: formatNumber(esloc) })}</div>
					<div className="text-lg font-bold text-blue-300 mt-2">
						{t("eslocStep.totalEsloc", { value: formatNumber(totalEslocKsloc), forms: totalFormCount })}
					</div>
				</div>
			</Section>
		</>
	);
}
