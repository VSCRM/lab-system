import { useTranslation, Trans } from "react-i18next";
import Section from "@/components/ui/Section";
import FormulaBlock from "@/components/ui/FormulaBlock";
import { formatNumber } from "@/lib/format";

interface SizeStepsProps {
	k1: number;
	k2: number;
	k3: number;
	kp: number;
	fr: number;
	rk: number;
}

/** Крок 2-3: функціональний розмір (ФР) та розмір коду (РК). */
export default function SizeSteps({ k1, k2, k3, kp, fr, rk }: SizeStepsProps) {
	const { t } = useTranslation("lab1");

	return (
		<>
			<Section title={t("sizeSteps.functionalSizeTitle")}>
				<FormulaBlock
					formula={t("sizeSteps.functionalSizeFormula")}
					result={t("sizeSteps.functionalSizeResult", { fr: formatNumber(fr) })}
					steps={[<Trans key="fr-step" t={t} i18nKey="sizeSteps.functionalSizeStep" values={{ k1, k2, k3, sum: k1 + k2 + k3 }} />]}
				/>
			</Section>

			<Section title={t("sizeSteps.codeVolumeTitle")}>
				<FormulaBlock
					formula={t("sizeSteps.codeVolumeFormula")}
					result={t("sizeSteps.codeVolumeResult", { rk: formatNumber(rk) })}
					steps={[<Trans key="rk-step" t={t} i18nKey="sizeSteps.codeVolumeStep" values={{ fr: formatNumber(fr), kp }} />]}
				/>
			</Section>
		</>
	);
}
