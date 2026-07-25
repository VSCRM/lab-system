import { Trans, useTranslation } from "react-i18next";
import Section from "@/components/ui/Section";
import NumberField from "@/components/ui/NumberField";
import FormulaBlock from "@/components/ui/FormulaBlock";
import ResultStat from "@/components/ui/ResultStat";
import type { UseValidatedNumberResult } from "@/hooks/useValidatedNumber";
import { formatNumber } from "@/lib/format";

interface CostFactorAndResultProps {
	z: UseValidatedNumberResult;
	rk: number;
	e: number;
	t: number;
}

/** Крок 5: показник витрат (Z) та підсумкова трудомісткість. */
export default function CostFactorAndResult({ z, rk, e, t: laborCost }: CostFactorAndResultProps) {
	const { t } = useTranslation("lab1");

	return (
		<>
			<Section title={t("costFactor.stepTitle")}>
				<NumberField
					label={t("costFactor.zLabel")}
					value={z.raw}
					onChange={z.onChange}
					error={z.error}
					step="0.01"
					hint={t("costFactor.zHint")}
				/>
			</Section>

			<Section title={t("result.title")} variant="result">
				<FormulaBlock
					size="lg"
					formula={t("result.formula")}
					result={t("result.result", { t: formatNumber(laborCost) })}
					steps={[<Trans key="t-step" t={t} i18nKey="result.step" values={{ rk: formatNumber(rk), e: formatNumber(e, 4), z: z.value }} />]}
				/>

				<div className="mt-6 grid sm:grid-cols-3 gap-4">
					<ResultStat label={t("result.statCodeVolume")} value={`${formatNumber(rk)} KLOC`} />
					<ResultStat label={t("result.statGrowthRate")} value={formatNumber(e)} />
					<ResultStat label={t("result.statLabor")} value={`${formatNumber(laborCost)} ${t("result.unitPersonMonths")}`} highlight />
				</div>
			</Section>
		</>
	);
}
