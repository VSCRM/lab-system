import { Trans, useTranslation } from "react-i18next";
import Section from "@/components/ui/Section";
import FormulaBlock from "@/components/ui/FormulaBlock";
import RatingsGrid, { type RatingFieldEntry } from "./RatingsGrid";
import { formatNumber } from "@/lib/format";

interface RatingsStepProps {
	entries: readonly RatingFieldEntry[];
	sumR: number;
	e: number;
}

/** Крок 4: показники розробки (R₁-R₅) та похідний показник Е. */
export default function RatingsStep({ entries, sumR, e }: RatingsStepProps) {
	const { t } = useTranslation("lab1");

	return (
		<Section title={t("ratings.stepTitle")}>
			<RatingsGrid entries={entries} />
			<div className="mt-4">
				<FormulaBlock
					formula={t("ratings.exponentFormula")}
					result={t("ratings.exponentResult", { e: formatNumber(e, 4) })}
					steps={[<Trans key="sum-step" t={t} i18nKey="ratings.sumStep" values={{ sum: formatNumber(sumR) }} />]}
				/>
			</div>
		</Section>
	);
}
