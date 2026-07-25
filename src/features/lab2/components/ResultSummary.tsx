import { Trans, useTranslation } from "react-i18next";
import Section from "@/components/ui/Section";
import FormulaBlock from "@/components/ui/FormulaBlock";
import ResultStat from "@/components/ui/ResultStat";
import { formatInteger, formatNumber } from "@/lib/format";

interface ResultSummaryProps {
	th: number;
	kc: number;
	kt: number;
	kh: number;
	tp: number;
	v3: number;
	t3: number;
	staffCount: number;
}

/** Підсумкова трудомісткість (T₃) та фінальний банер з чисельністю виконавців. */
export default function ResultSummary({ th, kc, kt, kh, tp, v3, t3, staffCount }: ResultSummaryProps) {
	const { t } = useTranslation("lab2");

	return (
		<>
			<Section title={t("result.title")} variant="result">
				<FormulaBlock
					size="lg"
					formula={t("result.formula")}
					result={t("result.result", { t3: formatNumber(t3) })}
					steps={[<Trans key="t3-step" t={t} i18nKey="result.step" values={{ th, kc, kt, kh }} />]}
				/>

				<div className="mt-6 grid sm:grid-cols-2 gap-4">
					<ResultStat label={t("result.statCodeVolume")} value={`${formatInteger(v3)} LOC`} />
					<ResultStat label={t("result.statLabor")} value={`${formatNumber(t3)} ${t("result.unitPersonDays")}`} highlight />
				</div>
			</Section>

			<div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl p-1 shadow-xl shadow-yellow-500/10">
				<div className="bg-slate-900 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
					<div className="text-center sm:text-left">
						<div className="text-yellow-500 font-bold uppercase tracking-wider text-xs sm:text-sm">{t("result.bannerTitle")}</div>
						<div className="text-2xl sm:text-3xl font-black text-white">
							<Trans
								t={t}
								i18nKey="result.bannerResult"
								values={{ count: Math.ceil(staffCount) }}
								components={{ 1: <span className="text-yellow-400" /> }}
							/>
						</div>
					</div>
					<div className="bg-slate-800/80 px-6 py-3 rounded-xl border border-yellow-500/20 text-right">
						<div className="text-slate-400 text-xs uppercase">{t("result.deadlineLabel")}</div>
						<div className="text-lg sm:text-xl font-bold text-white">
							{t("result.deadlineValue", { years: tp })}{" "}
							<span className="text-slate-500 text-sm font-normal">{t("result.deadlinePlanned")}</span>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
