import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import LabHeader from "@/components/labs/LabHeader";
import Section from "@/components/ui/Section";
import NumberField from "@/components/ui/NumberField";
import FormulaBlock from "@/components/ui/FormulaBlock";
import ScaleFactorGrid from "@/components/cocomo/ScaleFactorGrid";
import CostDriverGrid from "@/components/cocomo/CostDriverGrid";
import StaffAllocationTable from "@/components/cocomo/StaffAllocationTable";
import FinalMetricsPanel from "@/components/cocomo/FinalMetricsPanel";
import { useValidatedNumber } from "@/hooks/useValidatedNumber";
import { useStaffAllocation } from "@/hooks/useStaffAllocation";
import { useCocomoDrivers } from "@/hooks/useCocomoDrivers";
import { lab5FieldSchemas } from "@/lib/validation/schemas";
import { computeLab5 } from "@/lib/calculations/lab5";
import { formatNumber } from "@/lib/format";
import { nominalCostDrivers, type ScaleFactors } from "@/constants/cocomo";

const INITIAL_SCALE_FACTORS: ScaleFactors = { prec: 5.33, flex: 3.04, resl: 4.24, team: 3.29, pmat: 6.68 };

/** Лабораторна робота №5 — orchestrator only, composes shared cocomo components. */
export default function Lab5() {
	const { t } = useTranslation("lab5");
	const sloc = useValidatedNumber(5000, lab5FieldSchemas.sloc);
	const { scaleFactors, drivers, scaleFactorRaw, driverRaw, scaleFactorErrors, driverErrors, updateScaleFactor, updateDriver } =
		useCocomoDrivers(INITIAL_SCALE_FACTORS, nominalCostDrivers());

	const initialStaff = useMemo(
		() => [
			{ role: t("initialRoles.developer"), rate: 3000, share: 50 },
			{ role: t("initialRoles.seniorDeveloper"), rate: 0, share: 0 },
			{ role: t("initialRoles.analyst"), rate: 3500, share: 20 },
			{ role: t("initialRoles.manager"), rate: 4000, share: 10 },
			{ role: t("initialRoles.tester"), rate: 2200, share: 20 },
		],
		// Only used as the one-time seed value for useStaffAllocation's initial
		// state — intentionally not re-run on every language change so an
		// in-progress edit isn't clobbered by a language switch.
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[],
	);
	const { staff, updateMember, addMember, removeMember, totalShare } = useStaffAllocation(initialStaff);

	const result = useMemo(() => computeLab5({ sloc: sloc.value, scaleFactors, drivers, staff }), [sloc.value, scaleFactors, drivers, staff]);

	return (
		<div className="space-y-6 sm:space-y-8">
			<LabHeader title={t("header.title")} subtitle={t("header.subtitle")} />

			<Section title={t("volume.stepTitle")}>
				<NumberField
					label={t("volume.slocLabel")}
					value={sloc.raw}
					onChange={sloc.onChange}
					error={sloc.error}
					hint={t("volume.kslocHint", { value: formatNumber(result.ksloc) })}
				/>
			</Section>

			<Section title={t("scaleFactorsSection.stepTitle")}>
				<ScaleFactorGrid
					raw={scaleFactorRaw}
					errors={scaleFactorErrors}
					onChange={updateScaleFactor}
					sum={result.sumSf}
					exponent={result.e}
				/>
			</Section>

			<Section title={t("costDriversSection.stepTitle")}>
				<CostDriverGrid
					raw={driverRaw}
					errors={driverErrors}
					onChange={updateDriver}
					eaf={result.eaf}
					helperText={t("costDriversSection.helperText")}
				/>
			</Section>

			<Section title={t("effort.stepTitle")} variant="result">
				<FormulaBlock size="lg" formula={t("effort.formula")} result={t("effort.result", { value: formatNumber(result.effort) })} />
			</Section>

			<div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
				<Section title={t("staffSection.stepTitle")}>
					<StaffAllocationTable
						staff={staff}
						onUpdate={updateMember}
						onAdd={addMember}
						onRemove={removeMember}
						totalShare={totalShare}
						avgRate={result.avgRate}
					/>
				</Section>

				<Section title={t("finalSection.stepTitle")} variant="result">
					<FinalMetricsPanel
						effort={result.adjustedEffort}
						duration={result.duration}
						totalCost={result.totalCost}
						staffing={result.staffing}
						footer={
							<div className="mt-8 border-t border-blue-500/20 pt-4">
								<h4 className="text-xs font-bold text-blue-300 uppercase mb-2">{t("finalSection.rationaleTitle")}</h4>
								<p className="text-[11px] text-slate-400 leading-relaxed italic">
									{t("finalSection.rationaleText", { sloc: sloc.value, staffing: formatNumber(result.staffing, 1) })}
								</p>
							</div>
						}
					/>
				</Section>
			</div>
		</div>
	);
}
