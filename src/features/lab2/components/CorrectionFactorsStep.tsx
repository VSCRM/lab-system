import { useTranslation } from "react-i18next";
import Section from "@/components/ui/Section";
import NumberField from "@/components/ui/NumberField";
import type { UseValidatedNumberResult } from "@/hooks/useValidatedNumber";

interface CorrectionFactorsStepProps {
	kc: UseValidatedNumberResult;
	kt: UseValidatedNumberResult;
	kh: UseValidatedNumberResult;
}

/** Крок 3: поправочні коефіцієнти складності, типовості та новизни. */
export default function CorrectionFactorsStep({ kc, kt, kh }: CorrectionFactorsStepProps) {
	const { t } = useTranslation("lab2");

	return (
		<Section title={t("correctionFactors.stepTitle")}>
			<div className="grid sm:grid-cols-3 gap-4">
				<NumberField
					label={t("correctionFactors.kcLabel")}
					value={kc.raw}
					onChange={kc.onChange}
					error={kc.error}
					step="0.01"
					hint={t("correctionFactors.kcHint")}
				/>
				<NumberField
					label={t("correctionFactors.ktLabel")}
					value={kt.raw}
					onChange={kt.onChange}
					error={kt.error}
					step="0.01"
					hint={t("correctionFactors.ktHint")}
				/>
				<NumberField
					label={t("correctionFactors.khLabel")}
					value={kh.raw}
					onChange={kh.onChange}
					error={kh.error}
					step="0.01"
					hint={t("correctionFactors.khHint")}
				/>
			</div>
		</Section>
	);
}
