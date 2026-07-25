import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { formatNumber, formatThousands } from "@/lib/format";

interface FinalMetricsPanelProps {
	effort: number;
	duration: number;
	totalCost: number;
	staffing: number;
	footer?: ReactNode;
}

/** The four-tile "Effort / Duration / Cost / Staffing" summary shared by Lab 5 and Lab 6. */
export default function FinalMetricsPanel({ effort, duration, totalCost, staffing, footer }: FinalMetricsPanelProps) {
	const { t } = useTranslation("cocomo");

	return (
		<>
			<div className="grid grid-cols-2 gap-4 sm:gap-6">
				<div className="bg-blue-900/20 p-4 rounded-lg">
					<p className="text-[10px] text-blue-300 uppercase">{t("finalMetrics.effort")}</p>
					<p className="text-xl sm:text-2xl font-bold text-white">
						{formatNumber(effort, 1)} {t("finalMetrics.unitPersonMonths")}
					</p>
				</div>
				<div className="bg-blue-900/20 p-4 rounded-lg">
					<p className="text-[10px] text-blue-300 uppercase">{t("finalMetrics.duration")}</p>
					<p className="text-xl sm:text-2xl font-bold text-white">
						{formatNumber(duration, 1)} {t("finalMetrics.unitMonths")}
					</p>
				</div>
				<div className="bg-yellow-900/20 p-4 rounded-lg border border-yellow-500/20">
					<p className="text-[10px] text-yellow-400 uppercase">{t("finalMetrics.totalCost")}</p>
					<p className="text-xl sm:text-2xl font-bold text-yellow-500">${formatThousands(totalCost)}</p>
				</div>
				<div className="bg-blue-900/20 p-4 rounded-lg">
					<p className="text-[10px] text-blue-300 uppercase">{t("finalMetrics.staffing")}</p>
					<p className="text-xl sm:text-2xl font-bold text-white">
						{formatNumber(staffing, 1)} {t("finalMetrics.unitPeople")}
					</p>
				</div>
			</div>
			{footer}
		</>
	);
}
