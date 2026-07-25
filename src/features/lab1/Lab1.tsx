import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import LabHeader from "@/components/labs/LabHeader";
import ClassifiersStep from "./components/ClassifiersStep";
import SizeSteps from "./components/SizeSteps";
import RatingsStep from "./components/RatingsStep";
import CostFactorAndResult from "./components/CostFactorAndResult";
import { useValidatedNumber } from "@/hooks/useValidatedNumber";
import { lab1FieldSchemas } from "@/lib/validation/schemas";
import { computeLab1 } from "@/lib/calculations/lab1";

/**
 * Лабораторна робота №1 — orchestrator only: owns form state via hooks,
 * derives the result via the pure calculation module, and composes
 * presentational step components. No JSX-heavy markup lives here.
 */
export default function Lab1() {
	const { t } = useTranslation("lab1");

	const k1 = useValidatedNumber(10, lab1FieldSchemas.k1);
	const k2 = useValidatedNumber(14, lab1FieldSchemas.k2);
	const k3 = useValidatedNumber(8, lab1FieldSchemas.k3);
	const kp = useValidatedNumber(53, lab1FieldSchemas.kp);
	const r1 = useValidatedNumber(3.72, lab1FieldSchemas.r);
	const r2 = useValidatedNumber(3.04, lab1FieldSchemas.r);
	const r3 = useValidatedNumber(4.24, lab1FieldSchemas.r);
	const r4 = useValidatedNumber(3.29, lab1FieldSchemas.r);
	const r5 = useValidatedNumber(4.68, lab1FieldSchemas.r);
	const z = useValidatedNumber(1.0, lab1FieldSchemas.z);

	const ratings = useMemo(() => [r1.value, r2.value, r3.value, r4.value, r5.value], [r1.value, r2.value, r3.value, r4.value, r5.value]);
	const ratingFields = [
		{ labelKey: "ratings.r1", field: r1 },
		{ labelKey: "ratings.r2", field: r2 },
		{ labelKey: "ratings.r3", field: r3 },
		{ labelKey: "ratings.r4", field: r4 },
		{ labelKey: "ratings.r5", field: r5 },
	] as const;

	const result = useMemo(
		() => computeLab1({ k1: k1.value, k2: k2.value, k3: k3.value, kp: kp.value, ratings, z: z.value }),
		[k1.value, k2.value, k3.value, kp.value, ratings, z.value],
	);

	return (
		<div className="space-y-6 sm:space-y-8">
			<LabHeader title={t("header.title")} subtitle={t("header.subtitle")} />

			<ClassifiersStep k1={k1} k2={k2} k3={k3} kp={kp} />

			<SizeSteps k1={k1.value} k2={k2.value} k3={k3.value} kp={kp.value} fr={result.fr} rk={result.rk} />

			<RatingsStep entries={ratingFields} sumR={result.sumR} e={result.e} />

			<CostFactorAndResult z={z} rk={result.rk} e={result.e} t={result.t} />
		</div>
	);
}
