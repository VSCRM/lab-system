import { useTranslation } from "react-i18next";
import Section from "@/components/ui/Section";
import NumberField from "@/components/ui/NumberField";
import FormulaBlock from "@/components/ui/FormulaBlock";
import ResultStat from "@/components/ui/ResultStat";
import Button from "@/components/ui/Button";
import { useValidatedNumber } from "@/hooks/useValidatedNumber";
import { lab4FieldSchemas } from "@/lib/validation/schemas";
import { computeLab4 } from "@/lib/calculations/lab4";
import { formatNumber } from "@/lib/format";

interface SummaryStepProps {
	ilfDet: number;
	ilfRet: number;
	ilfExplanation: string;
	eqDet: number;
	eqFtr: number;
	eqExplanation: string;
	onReset: () => void;
}

export default function SummaryStep({ ilfDet, ilfRet, ilfExplanation, eqDet, eqFtr, eqExplanation, onReset }: SummaryStepProps) {
	const { t } = useTranslation("lab4");
	const vaf = useValidatedNumber(1.0, lab4FieldSchemas.vaf);

	const result = computeLab4({ ilfDet, ilfRet, eqDet, eqFtr, vaf: vaf.value });

	return (
		<div className="space-y-6 sm:space-y-8">
			<Section title={t("summary.overviewTitle")}>
				<div className="grid sm:grid-cols-2 gap-4 mb-4">
					<div className="bg-slate-900/50 rounded-lg p-4">
						<p className="text-xs text-blue-300 mb-1">{t("summary.ilfCardTitle")}</p>
						<p className="text-white font-mono text-sm">
							DET: <span className="text-yellow-400">{ilfDet}</span> | RET: <span className="text-yellow-400">{ilfRet}</span>
						</p>
						<p className="text-slate-400 text-xs mt-1">{ilfExplanation}</p>
						<p className="text-yellow-400 font-bold mt-2">
							{t(`complexityLevel.${result.ilf.level}`)} — {result.ilf.fp} FP
						</p>
					</div>
					<div className="bg-slate-900/50 rounded-lg p-4">
						<p className="text-xs text-blue-300 mb-1">{t("summary.eqCardTitle")}</p>
						<p className="text-white font-mono text-sm">
							DET: <span className="text-yellow-400">{eqDet}</span> | FTR: <span className="text-yellow-400">{eqFtr}</span>
						</p>
						<p className="text-slate-400 text-xs mt-1">{eqExplanation}</p>
						<p className="text-yellow-400 font-bold mt-2">
							{t(`complexityLevel.${result.eq.level}`)} — {result.eq.fp} FP
						</p>
					</div>
				</div>
			</Section>

			<Section title={t("summary.uftTitle")}>
				<FormulaBlock
					formula={t("summary.uftFormula")}
					result={t("summary.uftResult", { uft: result.uft })}
					steps={[t("summary.uftStep", { ilfFp: result.ilf.fp, eqFp: result.eq.fp })]}
				/>
				<div className="mt-4">
					<NumberField
						label={t("summary.vafLabel")}
						value={vaf.raw}
						onChange={vaf.onChange}
						error={vaf.error}
						step="0.01"
						hint={t("summary.vafHint")}
					/>
				</div>
			</Section>

			<Section title={t("summary.aftTitle")} variant="result">
				<FormulaBlock
					size="lg"
					formula={t("summary.aftFormula")}
					result={t("summary.aftResult", { aft: formatNumber(result.aft) })}
					steps={[t("summary.aftStep", { uft: result.uft, vaf: vaf.value })]}
				/>
				<div className="mt-6 grid sm:grid-cols-3 gap-4">
					<ResultStat label={t("summary.statIlf")} value={`${result.ilf.fp} FP`} unit={t(`complexityLevel.${result.ilf.level}`)} />
					<ResultStat label={t("summary.statEq")} value={`${result.eq.fp} FP`} unit={t(`complexityLevel.${result.eq.level}`)} />
					<ResultStat label={t("summary.statAft")} value={`${formatNumber(result.aft)} FP`} highlight />
				</div>
			</Section>

			<Button variant="ghost" onClick={onReset}>
				{t("summary.resetButton")}
			</Button>
		</div>
	);
}
