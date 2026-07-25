import { useTranslation } from "react-i18next";
import Section from "@/components/ui/Section";
import FormulaBlock from "@/components/ui/FormulaBlock";
import ResultStat from "@/components/ui/ResultStat";
import { formatNumber } from "@/lib/format";
import type { CocomoModelMode } from "@/lib/calculations/lab3";
import type { CocomoBasicCoefficients } from "@/constants/cocomo";

interface ResultsSectionProps {
	mode: CocomoModelMode;
	coef: CocomoBasicCoefficients;
	currentE: number;
	tdev: number;
	ss: number;
	p: number;
}

/** Підсумкова секція з формулою поточного режиму та зведеною статистикою. */
export default function ResultsSection({ mode, coef, currentE, tdev, ss, p }: ResultsSectionProps) {
	const { t } = useTranslation("lab3");

	return (
		<Section title={t("results.title")} variant="result">
			<FormulaBlock
				size="lg"
				formula={`E = ${coef.a} × Size^${coef.b}${mode === "detailed" ? " × EAF" : ""}`}
				result={t("results.resultLabel", { value: formatNumber(currentE) })}
			/>

			<div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
				<ResultStat label={t("results.statEffort")} value={formatNumber(currentE)} unit={t("results.unitPersonMonths")} />
				<ResultStat label={t("results.statDuration")} value={formatNumber(tdev)} unit={t("results.unitMonths")} />
				<ResultStat label={t("results.statStaff")} value={Math.ceil(ss)} unit={t("results.unitPeople")} />
				<ResultStat label={t("results.statProductivity")} value={formatNumber(p, 3)} unit={t("results.unitProductivity")} highlight />
			</div>
		</Section>
	);
}
