import { useState } from "react";
import { useTranslation } from "react-i18next";
import LabHeader from "@/components/labs/LabHeader";
import StepIndicator from "@/components/ui/StepIndicator";
import ApiKeySetup from "./components/ApiKeySetup";
import ComplexityAnalysisStep, { type FieldDef } from "./components/ComplexityAnalysisStep";
import SummaryStep from "./components/SummaryStep";
import { ilfComplexity, eqComplexity } from "@/lib/calculations/lab4";
import { lab4FieldSchemas } from "@/lib/validation/schemas";

type WizardStep = 0 | 1 | 2 | 3;

interface IlfFields {
	det: number;
	ret: number;
	[key: string]: number;
}

interface EqFields {
	det: number;
	ftr: number;
	[key: string]: number;
}

function parseIlfFields(raw: Record<string, unknown>): IlfFields | null {
	const det = Number(raw["det"]);
	const ret = Number(raw["ret"]);
	if (!Number.isFinite(det) || !Number.isFinite(ret)) return null;
	return { det, ret };
}

function parseEqFields(raw: Record<string, unknown>): EqFields | null {
	const det = Number(raw["det"]);
	const ftr = Number(raw["ftr"]);
	if (!Number.isFinite(det) || !Number.isFinite(ftr)) return null;
	return { det, ftr };
}

export default function Lab4() {
	const { t } = useTranslation("lab4");
	const [step, setStep] = useState<WizardStep>(0);
	const [apiKey, setApiKey] = useState("");

	const [ilf, setIlf] = useState<{ fields: IlfFields; explanation: string } | null>(null);
	const [eq, setEq] = useState<{ fields: EqFields; explanation: string } | null>(null);

	const resetAll = () => {
		setStep(0);
		setIlf(null);
		setEq(null);
	};

	const ilfFieldDefs: readonly [FieldDef<IlfFields>, FieldDef<IlfFields>] = [
		{ key: "det", label: t("ilfStep.detLabel"), hint: t("ilfStep.detHint"), schema: lab4FieldSchemas.det },
		{ key: "ret", label: t("ilfStep.retLabel"), hint: t("ilfStep.retHint"), schema: lab4FieldSchemas.ret },
	];

	const eqFieldDefs: readonly [FieldDef<EqFields>, FieldDef<EqFields>] = [
		{ key: "det", label: t("eqStep.detLabel"), hint: t("eqStep.detHint"), schema: lab4FieldSchemas.det },
		{ key: "ftr", label: t("eqStep.ftrLabel"), hint: t("eqStep.ftrHint"), schema: lab4FieldSchemas.ftr },
	];

	const stepLabels = [
		{ n: 1, label: t("steps.step1") },
		{ n: 2, label: t("steps.step2") },
		{ n: 3, label: t("steps.step3") },
	];

	return (
		<div className="space-y-6 sm:space-y-8">
			<LabHeader title={t("header.title")} subtitle={t("header.subtitle")} />

			{step > 0 && <StepIndicator steps={stepLabels} current={step} onStepClick={(n) => setStep(n as WizardStep)} />}

			{step === 0 && <ApiKeySetup apiKey={apiKey} onApiKeyChange={setApiKey} onContinue={() => setStep(1)} />}

			{step === 1 && (
				<>
					<ComplexityAnalysisStep<IlfFields>
						heading={t("ilfStep.heading")}
						description={t("ilfStep.description")}
						fileHint={t("ilfStep.fileHint")}
						prompt={t("prompts.ilf")}
						apiKey={apiKey}
						parse={parseIlfFields}
						fieldDefs={ilfFieldDefs}
						complexity={(fields) => ilfComplexity(fields.det, fields.ret)}
						taskLabel={t("ilfStep.taskLabel")}
						continueLabel={t("ilfStep.continueLabel")}
						onContinue={(fields, explanation) => {
							setIlf({ fields, explanation });
							setStep(2);
						}}
					/>
					<button type="button" onClick={() => setStep(0)} className="mt-3 w-full text-xs text-slate-500 hover:text-slate-400 underline">
						{t("changeApiKey")}
					</button>
				</>
			)}

			{step === 2 && (
				<ComplexityAnalysisStep<EqFields>
					heading={t("eqStep.heading")}
					description={t("eqStep.description")}
					fileHint={t("eqStep.fileHint")}
					prompt={t("prompts.eq")}
					apiKey={apiKey}
					parse={parseEqFields}
					fieldDefs={eqFieldDefs}
					complexity={(fields) => eqComplexity(fields.det, fields.ftr)}
					taskLabel={t("eqStep.taskLabel")}
					continueLabel={t("eqStep.continueLabel")}
					onContinue={(fields, explanation) => {
						setEq({ fields, explanation });
						setStep(3);
					}}
				/>
			)}

			{step === 3 && ilf && eq && (
				<SummaryStep
					ilfDet={ilf.fields.det}
					ilfRet={ilf.fields.ret}
					ilfExplanation={ilf.explanation}
					eqDet={eq.fields.det}
					eqFtr={eq.fields.ftr}
					eqExplanation={eq.explanation}
					onReset={resetAll}
				/>
			)}
		</div>
	);
}
