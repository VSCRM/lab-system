import { useTranslation } from "react-i18next";
import Section from "@/components/ui/Section";
import FormulaBlock from "@/components/ui/FormulaBlock";
import FunctionCatalogList from "./FunctionCatalogList";
import type { CatalogFunction } from "@/lib/calculations/lab2";
import { formatInteger } from "@/lib/format";

interface CatalogStepProps {
	functions: readonly CatalogFunction[];
	onToggle: (id: number) => void;
	v3: number;
}

/** Крок 1: каталог функцій ПЗ та обчислення обраного обсягу коду (V₃). */
export default function CatalogStep({ functions, onToggle, v3 }: CatalogStepProps) {
	const { t } = useTranslation("lab2");

	return (
		<Section title={t("catalog.stepTitle")}>
			<FunctionCatalogList functions={functions} onToggle={onToggle} />
			<div className="mt-4">
				<FormulaBlock formula={t("catalog.formula")} result={t("catalog.result", { v3: formatInteger(v3) })} />
			</div>
		</Section>
	);
}
