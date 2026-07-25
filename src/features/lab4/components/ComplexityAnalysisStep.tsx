import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import Alert from "@/components/ui/Alert";
import { useVisionAnalysis } from "@/hooks/useVisionAnalysis";
import { validateField } from "@/lib/validation/common";
import type { ComplexityResult } from "@/lib/calculations/lab4";
import type { z } from "zod";

export interface FieldDef<T extends Record<string, number>> {
	key: keyof T & string;
	label: string;
	hint: string;
	schema: z.ZodTypeAny;
}

interface ComplexityAnalysisStepProps<T extends Record<string, number>> {
	heading: string;
	description: string;
	fileHint: string;
	prompt: string;
	apiKey: string;
	parse: (raw: Record<string, unknown>) => T | null;
	fieldDefs: readonly [FieldDef<T>, FieldDef<T>];
	complexity: (fields: T) => ComplexityResult;
	taskLabel: string;
	continueLabel: string;
	onContinue: (fields: T, explanation: string) => void;
}

export default function ComplexityAnalysisStep<T extends Record<string, number>>({
	heading,
	description,
	fileHint,
	prompt,
	apiKey,
	parse,
	fieldDefs,
	complexity,
	taskLabel,
	continueLabel,
	onContinue,
}: ComplexityAnalysisStepProps<T>) {
	const { t } = useTranslation("lab4");
	const vision = useVisionAnalysis<T>();
	const [localFields, setLocalFields] = useState<T | null>(null);
	const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof T & string, string | null>>>({});

	useEffect(() => {
		setLocalFields(vision.fields);
	}, [vision.fields]);

	const updateField = (def: FieldDef<T>, raw: string) => {
		const result = validateField(def.schema, raw);
		setFieldErrors((prev) => ({ ...prev, [def.key]: result.error }));
		setLocalFields((prev) => (prev ? { ...prev, [def.key]: result.value } : prev));
	};

	const complexityResult = localFields ? complexity(localFields) : null;

	return (
		<Section variant="accent" className="border-purple-500/30">
			<h3 className="text-lg sm:text-xl font-bold mb-2 text-purple-400">🤖 {heading}</h3>
			<p className="text-slate-400 text-sm mb-4">{description}</p>

			<div className="mb-4">
				<label className="block text-sm text-purple-300 mb-2">{fileHint}</label>
				<input
					type="file"
					accept="image/*"
					onChange={vision.handleFile}
					disabled={vision.analyzing}
					className="w-full bg-slate-900 border border-purple-500/30 rounded-lg px-4 py-3 text-white text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-purple-600 file:text-white hover:file:bg-purple-700 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
				/>
			</div>

			{vision.preview && (
				<img
					src={vision.preview}
					alt={t("analysisStep.uploadedImageAlt")}
					className="max-w-full max-h-56 mx-auto mb-4 border border-purple-500/30 rounded-lg object-contain"
				/>
			)}

			{vision.error && (
				<Alert variant="error" className="mb-4">
					{vision.error}
				</Alert>
			)}

			<Button
				variant="primary"
				onClick={() => void vision.analyze(apiKey, prompt, parse)}
				disabled={vision.analyzing || !vision.hasImage}
				loading={vision.analyzing}
				loadingLabel={
					vision.modelTrying ? t("analysisStep.tryingModelLabel", { model: vision.modelTrying }) : t("analysisStep.analyzingLabel")
				}
			>
				{t("analysisStep.analyzeButton")}
			</Button>

			{localFields && complexityResult && (
				<>
					<div className="mt-6 bg-blue-900/20 border border-blue-500/30 rounded-xl p-5">
						<h4 className="text-yellow-400 font-bold mb-4">{taskLabel}</h4>
						<div className="grid sm:grid-cols-2 gap-4 mb-4">
							{fieldDefs.map((def) => (
								<div key={def.key}>
									<label className="block text-sm text-blue-300 mb-2">{def.label}</label>
									<input
										type="number"
										value={localFields[def.key]}
										onChange={(e) => updateField(def, e.target.value)}
										className="w-full bg-slate-900 border border-blue-500/30 rounded-lg px-4 py-3 text-white"
									/>
									{fieldErrors[def.key] ? (
										<p className="field-error">{fieldErrors[def.key]}</p>
									) : (
										<p className="text-xs text-slate-400 mt-1">{def.hint}</p>
									)}
								</div>
							))}
						</div>
						{vision.explanation && <p className="text-xs text-slate-400 mb-4 italic">{vision.explanation}</p>}
						<div className="bg-slate-900/50 rounded-lg p-4 flex items-center justify-between flex-wrap gap-2">
							<div>
								<p className="text-blue-300 font-semibold text-sm">{t("analysisStep.complexityLabel")}</p>
								<p className="text-yellow-400 font-bold text-lg">{t(`complexityLevel.${complexityResult.level}`)}</p>
							</div>
							<div className="text-right">
								<p className="text-blue-300 font-semibold text-sm">{t("analysisStep.functionPointsLabel")}</p>
								<p className="text-yellow-400 font-bold text-3xl">{complexityResult.fp} FP</p>
							</div>
						</div>
					</div>

					<button
						type="button"
						onClick={() => onContinue(localFields, vision.explanation)}
						className="mt-4 w-full bg-gradient-to-r from-green-700 to-blue-700 hover:from-green-800 hover:to-blue-800 text-white font-bold py-3 px-6 rounded-lg transition-all"
					>
						{continueLabel}
					</button>
				</>
			)}
		</Section>
	);
}
