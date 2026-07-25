import { useTranslation } from "react-i18next";
import Section from "@/components/ui/Section";
import NumberField from "@/components/ui/NumberField";
import SelectField, { type SelectOption } from "@/components/ui/SelectField";
import type { UseValidatedNumberResult } from "@/hooks/useValidatedNumber";

export type ComplexityCategory = "1" | "2" | "3";

interface NormativeLaborStepProps {
	category: ComplexityCategory;
	onCategoryChange: (category: ComplexityCategory) => void;
	th: UseValidatedNumberResult;
	v3: number;
}

/** Крок 2: категорія складності ПЗ та нормативна трудомісткість (Tₕ). */
export default function NormativeLaborStep({ category, onCategoryChange, th, v3 }: NormativeLaborStepProps) {
	const { t } = useTranslation("lab2");

	const categoryOptions: readonly SelectOption<ComplexityCategory>[] = [
		{ value: "1", label: t("normativeLabor.category1") },
		{ value: "2", label: t("normativeLabor.category2") },
		{ value: "3", label: t("normativeLabor.category3") },
	];

	return (
		<Section title={t("normativeLabor.stepTitle")}>
			<div className="grid sm:grid-cols-2 gap-4">
				<SelectField
					label={t("normativeLabor.categoryLabel")}
					value={category}
					onChange={(e) => onCategoryChange(e.target.value as ComplexityCategory)}
					options={categoryOptions}
				/>
				<NumberField
					label={t("normativeLabor.thLabel")}
					value={th.raw}
					onChange={th.onChange}
					error={th.error}
					hint={t("normativeLabor.thHint", { v3, category })}
				/>
			</div>
		</Section>
	);
}
