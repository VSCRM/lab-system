import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import LabHeader from "@/components/labs/LabHeader";
import Section from "@/components/ui/Section";
import ScaleFactorGrid from "@/components/cocomo/ScaleFactorGrid";
import CostDriverGrid from "@/components/cocomo/CostDriverGrid";
import StaffAllocationTable from "@/components/cocomo/StaffAllocationTable";
import FinalMetricsPanel from "@/components/cocomo/FinalMetricsPanel";
import VolumeStep from "./components/VolumeStep";
import ModificationAndEslocStep from "./components/ModificationAndEslocStep";
import VolumeSummary from "./components/VolumeSummary";
import EffortDurationSteps from "./components/EffortDurationSteps";
import ProjectSummaryFooter from "./components/ProjectSummaryFooter";
import { useValidatedNumber } from "@/hooks/useValidatedNumber";
import { useStaffAllocation } from "@/hooks/useStaffAllocation";
import { useCocomoDrivers } from "@/hooks/useCocomoDrivers";
import { lab6FieldSchemas } from "@/lib/validation/schemas";
import { computeLab6 } from "@/lib/calculations/lab6";
import type { ScaleFactors, CostDrivers } from "@/constants/cocomo";

const INITIAL_SCALE_FACTORS: ScaleFactors = { prec: 1.24, flex: 1.01, resl: 1.41, team: 1.1, pmat: 1.56 };

const INITIAL_DRIVERS: CostDrivers = {
	rely: 0.82,
	data: 1.0,
	cplx: 0.87,
	ruse: 0.95,
	docu: 0.91,
	time: 1.0,
	stor: 1.0,
	pvol: 0.87,
	acap: 0.85,
	pcap: 0.88,
	pcon: 1.0,
	apex: 0.88,
	plex: 0.91,
	ltex: 0.91,
	tool: 0.86,
	site: 0.86,
	sced: 1.0,
};

/** Лабораторна робота №6 — orchestrator only, composes presentational step components. */
export default function Lab6() {
	const { t } = useTranslation("lab6");
	const designForms = useValidatedNumber(50, lab6FieldSchemas.forms);
	const designPercent = useValidatedNumber(0.2, lab6FieldSchemas.percent);
	const newForms = useValidatedNumber(30, lab6FieldSchemas.forms);
	const avgModule = useValidatedNumber(4000, lab6FieldSchemas.avgModule);

	const slocp = useValidatedNumber(250, lab6FieldSchemas.forms);
	const sloci = useValidatedNumber(150, lab6FieldSchemas.forms);
	const slocr = useValidatedNumber(150, lab6FieldSchemas.forms);

	const aa = useValidatedNumber(1, lab6FieldSchemas.percentageMetric);
	const su = useValidatedNumber(5, lab6FieldSchemas.percentageMetric);

	const { scaleFactors, drivers, scaleFactorRaw, driverRaw, scaleFactorErrors, driverErrors, updateScaleFactor, updateDriver } =
		useCocomoDrivers(INITIAL_SCALE_FACTORS, INITIAL_DRIVERS);

	const initialStaff = useMemo(
		() => [
			{ role: t("initialRoles.developer"), rate: 2500, share: 75 },
			{ role: t("initialRoles.seniorDeveloper"), rate: 0, share: 0 },
			{ role: t("initialRoles.analyst"), rate: 0, share: 0 },
			{ role: t("initialRoles.manager"), rate: 2500, share: 25 },
			{ role: t("initialRoles.tester"), rate: 0, share: 0 },
		],
		// One-time seed for useStaffAllocation — see the identical comment in Lab5.tsx.
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[],
	);
	const { staff, updateMember, addMember, removeMember, totalShare } = useStaffAllocation(initialStaff);

	const result = useMemo(
		() =>
			computeLab6({
				designForms: designForms.value,
				designPercent: designPercent.value,
				newForms: newForms.value,
				avgModule: avgModule.value,
				slocp: slocp.value,
				sloci: sloci.value,
				slocr: slocr.value,
				aa: aa.value,
				su: su.value,
				scaleFactors,
				drivers,
				staff,
			}),
		[
			designForms.value,
			designPercent.value,
			newForms.value,
			avgModule.value,
			slocp.value,
			sloci.value,
			slocr.value,
			aa.value,
			su.value,
			scaleFactors,
			drivers,
			staff,
		],
	);

	return (
		<div className="space-y-6 sm:space-y-8">
			<LabHeader title={t("header.title")} subtitle={t("header.subtitle")} />

			<VolumeStep
				designForms={designForms}
				designPercent={designPercent}
				newForms={newForms}
				avgModule={avgModule}
				slocDesign={result.slocDesign}
				slocNew={result.slocNew}
				totalSloc={result.totalSloc}
				ksloc={result.ksloc}
			/>

			<ModificationAndEslocStep
				slocp={slocp}
				sloci={sloci}
				slocr={slocr}
				aa={aa}
				su={su}
				dm={result.dm}
				cm={result.cm}
				im={result.im}
				esloc={result.esloc}
				totalEslocKsloc={result.totalEslocKsloc}
				totalFormCount={result.totalFormCount}
			/>

			<VolumeSummary ksloc={result.ksloc} totalEslocKsloc={result.totalEslocKsloc} dm={result.dm} cm={result.cm} im={result.im} />

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
				<CostDriverGrid raw={driverRaw} errors={driverErrors} onChange={updateDriver} eaf={result.eaf} />
			</Section>

			<EffortDurationSteps effort={result.effort} duration={result.duration} f={result.f} />

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
						effort={result.effort}
						duration={result.duration}
						totalCost={result.totalCost}
						staffing={result.staffing}
						footer={
							<ProjectSummaryFooter
								designFormsCount={designForms.value}
								designPercent={designPercent.value}
								newFormsCount={newForms.value}
								avgModule={avgModule.value}
								ksloc={result.ksloc}
								totalEslocKsloc={result.totalEslocKsloc}
							/>
						}
					/>
				</Section>
			</div>
		</div>
	);
}
