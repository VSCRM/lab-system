import { useTranslation } from "react-i18next";
import Section from "@/components/ui/Section";
import NumberField from "@/components/ui/NumberField";
import SelectField, { type SelectOption } from "@/components/ui/SelectField";
import type { UseValidatedNumberResult } from "@/hooks/useValidatedNumber";
import type { CocomoModelMode } from "@/lib/calculations/lab3";
import type { CocomoBasicCoefficients, DevelopmentMode } from "@/constants/cocomo";

interface ModeAndSizeStepProps {
	mode: CocomoModelMode;
	onModeChange: (mode: CocomoModelMode) => void;
	regime: DevelopmentMode;
	onRegimeChange: (regime: DevelopmentMode) => void;
	size: UseValidatedNumberResult;
	coef: CocomoBasicCoefficients;
}

/** Вибір рівня моделі (Basic/Detailed), режиму розробки та обсягу проекту. */
export default function ModeAndSizeStep({ mode, onModeChange, regime, onRegimeChange, size, coef }: ModeAndSizeStepProps) {
	const { t } = useTranslation("lab3");

	const modeOptions: readonly SelectOption<CocomoModelMode>[] = [
		{ value: "basic", label: t("modeAndSize.modeBasic") },
		{ value: "detailed", label: t("modeAndSize.modeDetailed") },
	];
	const regimeOptions: readonly SelectOption<DevelopmentMode>[] = [
		{ value: "organic", label: t("modeAndSize.regimeOrganic") },
		{ value: "semidetached", label: t("modeAndSize.regimeSemidetached") },
		{ value: "embedded", label: t("modeAndSize.regimeEmbedded") },
	];

	return (
		<Section title={t("modeAndSize.stepTitle")}>
			<div className="grid sm:grid-cols-2 gap-4">
				<SelectField
					label={t("modeAndSize.modeLabel")}
					value={mode}
					onChange={(e) => onModeChange(e.target.value as CocomoModelMode)}
					options={modeOptions}
				/>
				<SelectField
					label={t("modeAndSize.regimeLabel")}
					value={regime}
					onChange={(e) => onRegimeChange(e.target.value as DevelopmentMode)}
					options={regimeOptions}
				/>
			</div>

			<div className="mt-4">
				<NumberField label={t("modeAndSize.sizeLabel")} value={size.raw} onChange={size.onChange} error={size.error} />
			</div>

			<div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 mt-4">
				<div className="text-xs text-blue-300 font-semibold mb-2">{t("modeAndSize.coefficientsLabel", { regime })}</div>
				<div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm font-mono">
					<div>
						a = <span className="text-yellow-400">{coef.a}</span>
					</div>
					<div>
						b = <span className="text-yellow-400">{coef.b}</span>
					</div>
					<div>
						c = <span className="text-yellow-400">{coef.c}</span>
					</div>
					<div>
						d = <span className="text-yellow-400">{coef.d}</span>
					</div>
				</div>
			</div>
		</Section>
	);
}
