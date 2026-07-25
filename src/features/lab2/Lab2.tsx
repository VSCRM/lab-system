import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import LabHeader from "@/components/labs/LabHeader";
import CatalogStep from "./components/CatalogStep";
import NormativeLaborStep, { type ComplexityCategory } from "./components/NormativeLaborStep";
import CorrectionFactorsStep from "./components/CorrectionFactorsStep";
import StaffCountStep from "./components/StaffCountStep";
import ResultSummary from "./components/ResultSummary";
import { useValidatedNumber } from "@/hooks/useValidatedNumber";
import { lab2FieldSchemas } from "@/lib/validation/schemas";
import { computeLab2, type CatalogFunction } from "@/lib/calculations/lab2";

// `name` is a display-agnostic placeholder here — the actual visible label
// is looked up by id from the lab2 translation namespace (functions.<id>),
// so this data stays language-independent.
const INITIAL_FUNCTIONS: CatalogFunction[] = [
	{ id: 101, name: "101", loc: 150, enabled: true },
	{ id: 102, name: "102", loc: 450, enabled: true },
	{ id: 201, name: "201", loc: 4300, enabled: true },
	{ id: 204, name: "204", loc: 2670, enabled: true },
	{ id: 208, name: "208", loc: 5480, enabled: true },
	{ id: 308, name: "308", loc: 5750, enabled: true },
	{ id: 405, name: "405", loc: 370, enabled: true },
	{ id: 502, name: "502", loc: 7740, enabled: true },
	{ id: 506, name: "506", loc: 410, enabled: true },
	{ id: 602, name: "602", loc: 720, enabled: true },
	{ id: 704, name: "704", loc: 3200, enabled: true },
];

/** Лабораторна робота №2 — orchestrator only, composes presentational step components. */
export default function Lab2() {
	const { t } = useTranslation("lab2");
	const [functions, setFunctions] = useState<CatalogFunction[]>(INITIAL_FUNCTIONS);
	const [category, setCategory] = useState<ComplexityCategory>("2");

	const th = useValidatedNumber(692, lab2FieldSchemas.th);
	const kc = useValidatedNumber(1.25, lab2FieldSchemas.coefficient);
	const kt = useValidatedNumber(0.9, lab2FieldSchemas.coefficient);
	const kh = useValidatedNumber(1.0, lab2FieldSchemas.coefficient);
	const tk = useValidatedNumber(365, lab2FieldSchemas.days);
	const ts = useValidatedNumber(11, lab2FieldSchemas.days);
	const tv = useValidatedNumber(104, lab2FieldSchemas.days);
	const to = useValidatedNumber(31, lab2FieldSchemas.days);
	const tp = useValidatedNumber(1, lab2FieldSchemas.years);

	const toggleFunction = (id: number) => {
		setFunctions((prev) => prev.map((f) => (f.id === id ? { ...f, enabled: !f.enabled } : f)));
	};

	const result = useMemo(
		() =>
			computeLab2({
				functions,
				th: th.value,
				kc: kc.value,
				kt: kt.value,
				kh: kh.value,
				daysInYear: tk.value,
				holidays: ts.value,
				weekends: tv.value,
				vacation: to.value,
				planYears: tp.value,
			}),
		[functions, th.value, kc.value, kt.value, kh.value, tk.value, ts.value, tv.value, to.value, tp.value],
	);

	return (
		<div className="space-y-6 sm:space-y-8">
			<LabHeader title={t("header.title")} subtitle={t("header.subtitle")} />

			<CatalogStep functions={functions} onToggle={toggleFunction} v3={result.v3} />

			<NormativeLaborStep category={category} onCategoryChange={setCategory} th={th} v3={result.v3} />

			<CorrectionFactorsStep kc={kc} kt={kt} kh={kh} />

			<StaffCountStep tk={tk} ts={ts} tv={tv} to={to} tp={tp} t3={result.t3} tef={result.tef} staffCount={result.staffCount} />

			<ResultSummary
				th={th.value}
				kc={kc.value}
				kt={kt.value}
				kh={kh.value}
				tp={tp.value}
				v3={result.v3}
				t3={result.t3}
				staffCount={result.staffCount}
			/>
		</div>
	);
}
