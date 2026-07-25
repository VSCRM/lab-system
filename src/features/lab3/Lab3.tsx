import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import LabHeader from "@/components/labs/LabHeader";
import ModeAndSizeStep from "./components/ModeAndSizeStep";
import CostDriversStep from "./components/CostDriversStep";
import ModeExplanation from "./components/ModeExplanation";
import ResultsSection from "./components/ResultsSection";
import { useValidatedNumber } from "@/hooks/useValidatedNumber";
import { lab3Schema } from "@/lib/validation/schemas";
import { computeLab3, type CocomoModelMode } from "@/lib/calculations/lab3";
import type { DevelopmentMode } from "@/constants/cocomo";

/** Лабораторна робота №3 — orchestrator only, composes presentational step components. */
export default function Lab3() {
	const { t } = useTranslation("lab3");
	const [mode, setMode] = useState<CocomoModelMode>("basic");
	const [regime, setRegime] = useState<DevelopmentMode>("semidetached");

	const size = useValidatedNumber(55, lab3Schema.shape.size);
	const acap = useValidatedNumber(0.86, lab3Schema.shape.acap);
	const pcap = useValidatedNumber(0.7, lab3Schema.shape.pcap);
	const lexp = useValidatedNumber(0.95, lab3Schema.shape.lexp);
	const rely = useValidatedNumber(1.0, lab3Schema.shape.rely);
	const data = useValidatedNumber(1.0, lab3Schema.shape.data);

	const result = useMemo(
		() =>
			computeLab3({
				mode,
				regime,
				size: size.value,
				acap: acap.value,
				pcap: pcap.value,
				lexp: lexp.value,
				rely: rely.value,
				data: data.value,
			}),
		[mode, regime, size.value, acap.value, pcap.value, lexp.value, rely.value, data.value],
	);

	return (
		<div className="space-y-6 sm:space-y-8">
			<LabHeader title={t("header.title")} subtitle={t("header.subtitle")} />

			<ModeAndSizeStep mode={mode} onModeChange={setMode} regime={regime} onRegimeChange={setRegime} size={size} coef={result.coef} />

			{mode === "detailed" && <CostDriversStep acap={acap} pcap={pcap} lexp={lexp} rely={rely} data={data} eaf={result.eaf} />}

			<ModeExplanation mode={mode} eBasic={result.eBasic} tdev={result.tdev} ss={result.ss} p={result.p} eaf={result.eaf} />

			<ResultsSection mode={mode} coef={result.coef} currentE={result.currentE} tdev={result.tdev} ss={result.ss} p={result.p} />
		</div>
	);
}
