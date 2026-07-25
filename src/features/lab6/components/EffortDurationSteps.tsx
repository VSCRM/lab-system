import { useTranslation } from "react-i18next";
import Section from "@/components/ui/Section";
import FormulaBlock from "@/components/ui/FormulaBlock";
import { formatNumber } from "@/lib/format";

interface EffortDurationStepsProps {
	effort: number;
	duration: number;
	f: number;
}

/** Крок 6-7: трудомісткість та тривалість проекту. */
export default function EffortDurationSteps({ effort, duration, f }: EffortDurationStepsProps) {
	const { t } = useTranslation("lab6");

	return (
		<>
			<Section title={t("effortStep.stepTitle")} variant="result">
				<FormulaBlock size="lg" formula={t("effortStep.formula")} result={t("effortStep.result", { value: formatNumber(effort) })} />
			</Section>

			<Section title={t("durationStep.stepTitle")}>
				<FormulaBlock
					formula={t("durationStep.formula")}
					result={t("durationStep.result", { value: formatNumber(duration, 1) })}
					steps={[t("durationStep.step", { value: formatNumber(f, 4) })]}
				/>
			</Section>
		</>
	);
}
