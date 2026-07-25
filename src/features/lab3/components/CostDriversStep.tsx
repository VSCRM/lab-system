import { useTranslation } from "react-i18next";
import Section from "@/components/ui/Section";
import NumberField from "@/components/ui/NumberField";
import FormulaBlock from "@/components/ui/FormulaBlock";
import type { UseValidatedNumberResult } from "@/hooks/useValidatedNumber";
import { formatNumber } from "@/lib/format";

interface CostDriversStepProps {
	acap: UseValidatedNumberResult;
	pcap: UseValidatedNumberResult;
	lexp: UseValidatedNumberResult;
	rely: UseValidatedNumberResult;
	data: UseValidatedNumberResult;
	eaf: number;
}

/** Крок для деталізованого рівня: 5 драйверів витрат та похідний EAF. */
export default function CostDriversStep({ acap, pcap, lexp, rely, data, eaf }: CostDriversStepProps) {
	const { t } = useTranslation("lab3");

	return (
		<Section title={t("costDrivers.stepTitle")}>
			<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
				<NumberField
					label={t("costDrivers.acapLabel")}
					value={acap.raw}
					onChange={acap.onChange}
					error={acap.error}
					step="0.01"
					hint={t("costDrivers.acapHint")}
				/>
				<NumberField
					label={t("costDrivers.pcapLabel")}
					value={pcap.raw}
					onChange={pcap.onChange}
					error={pcap.error}
					step="0.01"
					hint={t("costDrivers.pcapHint")}
				/>
				<NumberField
					label={t("costDrivers.lexpLabel")}
					value={lexp.raw}
					onChange={lexp.onChange}
					error={lexp.error}
					step="0.01"
					hint={t("costDrivers.lexpHint")}
				/>
				<NumberField
					label={t("costDrivers.relyLabel")}
					value={rely.raw}
					onChange={rely.onChange}
					error={rely.error}
					step="0.01"
					hint={t("costDrivers.relyHint")}
				/>
				<NumberField
					label={t("costDrivers.dataLabel")}
					value={data.raw}
					onChange={data.onChange}
					error={data.error}
					step="0.01"
					hint={t("costDrivers.dataHint")}
				/>
			</div>

			<div className="mt-4">
				<FormulaBlock
					formula={t("costDrivers.formula")}
					result={t("costDrivers.result", { eaf: formatNumber(eaf, 4) })}
					steps={[
						t("costDrivers.step", {
							acap: acap.value,
							pcap: pcap.value,
							lexp: lexp.value,
							rely: rely.value,
							data: data.value,
						}),
					]}
				/>
			</div>
		</Section>
	);
}
