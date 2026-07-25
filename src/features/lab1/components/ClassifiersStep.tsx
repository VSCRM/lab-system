import { useTranslation } from "react-i18next";
import Section from "@/components/ui/Section";
import NumberField from "@/components/ui/NumberField";
import type { UseValidatedNumberResult } from "@/hooks/useValidatedNumber";

interface ClassifiersStepProps {
	k1: UseValidatedNumberResult;
	k2: UseValidatedNumberResult;
	k3: UseValidatedNumberResult;
	kp: UseValidatedNumberResult;
}

/** Крок 1: вихідні класифікатори (К1, К2, К3, КП). */
export default function ClassifiersStep({ k1, k2, k3, kp }: ClassifiersStepProps) {
	const { t } = useTranslation("lab1");

	return (
		<Section title={t("classifiers.stepTitle")}>
			<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
				<NumberField
					label={t("classifiers.k1Label")}
					value={k1.raw}
					onChange={k1.onChange}
					error={k1.error}
					hint={t("classifiers.rangeHint")}
				/>
				<NumberField
					label={t("classifiers.k2Label")}
					value={k2.raw}
					onChange={k2.onChange}
					error={k2.error}
					hint={t("classifiers.rangeHint")}
				/>
				<NumberField
					label={t("classifiers.k3Label")}
					value={k3.raw}
					onChange={k3.onChange}
					error={k3.error}
					hint={t("classifiers.rangeHint")}
				/>
			</div>
			<div className="mt-4">
				<NumberField
					label={t("classifiers.kpLabel")}
					value={kp.raw}
					onChange={kp.onChange}
					error={kp.error}
					hint={t("classifiers.kpHint")}
				/>
			</div>
		</Section>
	);
}
