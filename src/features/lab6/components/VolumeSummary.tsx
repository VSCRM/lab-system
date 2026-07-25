import { useTranslation } from "react-i18next";
import Section from "@/components/ui/Section";
import { formatNumber } from "@/lib/format";

interface VolumeSummaryProps {
	ksloc: number;
	totalEslocKsloc: number;
	dm: number;
	cm: number;
	im: number;
}

/** Підсумок кроків 1-3: загальний обсяг, еквівалентний обсяг та модифікація. */
export default function VolumeSummary({ ksloc, totalEslocKsloc, dm, cm, im }: VolumeSummaryProps) {
	const { t } = useTranslation("lab6");

	return (
		<Section title={t("volumeSummary.stepTitle")} variant="result">
			<div className="grid sm:grid-cols-3 gap-4">
				<div className="bg-slate-900/50 rounded-lg p-4 text-center">
					<div className="text-xs text-blue-300 mb-2">{t("volumeSummary.totalVolume")}</div>
					<div className="text-2xl font-bold text-white">{formatNumber(ksloc)}</div>
					<div className="text-xs text-slate-400">KSLOC</div>
				</div>
				<div className="bg-slate-900/50 rounded-lg p-4 text-center">
					<div className="text-xs text-blue-300 mb-2">{t("volumeSummary.equivalentVolume")}</div>
					<div className="text-2xl font-bold text-yellow-400">{formatNumber(totalEslocKsloc)}</div>
					<div className="text-xs text-slate-400">KSLOC</div>
				</div>
				<div className="bg-slate-900/50 rounded-lg p-4 text-center">
					<div className="text-xs text-blue-300 mb-2">{t("volumeSummary.modification")}</div>
					<div className="text-lg sm:text-2xl font-bold text-white">
						{formatNumber(dm, 1)}% / {formatNumber(cm, 1)}% / {formatNumber(im, 1)}%
					</div>
					<div className="text-xs text-slate-400">{t("volumeSummary.modificationLabels")}</div>
				</div>
			</div>
		</Section>
	);
}
