import { useTranslation } from "react-i18next";
import Section from "@/components/ui/Section";
import FormulaBlock from "@/components/ui/FormulaBlock";
import Alert from "@/components/ui/Alert";
import { formatNumber } from "@/lib/format";

interface ModeExplanationProps {
	mode: "basic" | "detailed";
	eBasic: number;
	tdev: number;
	ss: number;
	p: number;
	eaf: number;
}

/** Показує або 4-крокову розкладку базового рівня, або пояснення EAF для деталізованого. */
export default function ModeExplanation({ mode, eBasic, tdev, ss, p, eaf }: ModeExplanationProps) {
	const { t } = useTranslation("lab3");

	if (mode === "basic") {
		return (
			<Section title={t("basicMode.stepTitle")}>
				<div className="space-y-4">
					<FormulaBlock formula={t("basicMode.effortFormula")} result={t("basicMode.effortResult", { value: formatNumber(eBasic) })} />
					<FormulaBlock formula={t("basicMode.tdevFormula")} result={t("basicMode.tdevResult", { value: formatNumber(tdev) })} />
					<FormulaBlock formula={t("basicMode.ssFormula")} result={t("basicMode.ssResult", { value: formatNumber(ss, 0) })} />
					<FormulaBlock formula={t("basicMode.pFormula")} result={t("basicMode.pResult", { value: formatNumber(p, 3) })} />
				</div>
			</Section>
		);
	}

	return (
		<Alert variant="info">
			{t("detailedMode.info", {
				eaf: formatNumber(eaf, 4),
				direction: eaf < 1 ? t("detailedMode.directionDecreases") : t("detailedMode.directionIncreases"),
			})}
		</Alert>
	);
}
