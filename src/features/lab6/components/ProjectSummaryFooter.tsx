import { useTranslation } from "react-i18next";
import { formatNumber } from "@/lib/format";

interface ProjectSummaryFooterProps {
	designFormsCount: number;
	designPercent: number;
	newFormsCount: number;
	avgModule: number;
	ksloc: number;
	totalEslocKsloc: number;
}

/** Зведені дані проекту, що показуються під фінальними метриками Lab 6. */
export default function ProjectSummaryFooter({
	designFormsCount,
	designPercent,
	newFormsCount,
	avgModule,
	ksloc,
	totalEslocKsloc,
}: ProjectSummaryFooterProps) {
	const { t } = useTranslation("lab6");

	return (
		<div className="mt-6 bg-gradient-to-r from-green-900/20 to-blue-900/20 border border-green-500/20 rounded-lg p-4">
			<p className="text-xs font-bold text-green-400 mb-2">{t("finalSection.summaryTitle")}</p>
			<ul className="text-[10px] text-blue-200 space-y-1">
				<li>{t("finalSection.summaryDesignForms", { count: designFormsCount, percent: formatNumber(designPercent * 100, 0) })}</li>
				<li>{t("finalSection.summaryNewForms", { count: newFormsCount })}</li>
				<li>{t("finalSection.summaryAvgModule", { value: avgModule })}</li>
				<li>{t("finalSection.summaryTotalVolume", { value: formatNumber(ksloc) })}</li>
				<li>{t("finalSection.summaryEquivalentVolume", { value: formatNumber(totalEslocKsloc) })}</li>
			</ul>
		</div>
	);
}
