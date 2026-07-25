import { useRef, useState, type ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import { FREE_VISION_MODELS } from "@/lib/services/openRouterVision";
import Section from "@/components/ui/Section";
import Alert from "@/components/ui/Alert";
import { apiKeySchema } from "@/lib/validation/schemas";
import { API_KEY_CONFIG, OPENROUTER_CONFIG } from "@/lib/config";

interface ApiKeySetupProps {
	apiKey: string;
	onApiKeyChange: (key: string) => void;
	onContinue: () => void;
}

export default function ApiKeySetup({ apiKey, onApiKeyChange, onContinue }: ApiKeySetupProps) {
	const { t } = useTranslation("lab4");
	const [showKey, setShowKey] = useState(false);
	const [keyError, setKeyError] = useState<string | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleKeyInput = (raw: string) => {
		onApiKeyChange(raw.slice(0, API_KEY_CONFIG.maxLength));
		setKeyError(null);
	};

	const handleKeyFile = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (!file) return;
		if (file.size > API_KEY_CONFIG.maxKeyFileBytes) {
			setKeyError(t("apiKeySetup.errorFileTooBig"));
			return;
		}
		const reader = new FileReader();
		reader.onload = (ev) => {
			const raw = typeof ev.target?.result === "string" ? ev.target.result : "";
			const cleaned = raw
				.replace(/^\uFEFF/, "")
				.replace(/[\r\n\t]/g, "")
				.replace(/[^\x20-\x7E]/g, "")
				.trim()
				.slice(0, API_KEY_CONFIG.maxLength);
			onApiKeyChange(cleaned);
			setKeyError(null);
			setShowKey(true);
		};
		reader.onerror = () => setKeyError(t("apiKeySetup.errorFileRead"));
		reader.readAsText(file);
	};

	const handleContinueClick = () => {
		const result = apiKeySchema.safeParse(apiKey);
		if (!result.success) {
			setKeyError(result.error.issues[0]?.message ?? t("apiKeySetup.errorInvalidFormat"));
			return;
		}
		if (!apiKey.trim().startsWith("sk-or-")) {
			setKeyError(t("apiKeySetup.errorNotOpenRouterKey"));
			return;
		}
		onContinue();
	};

	const canContinue = apiKey.trim().length > 0;

	return (
		<Section variant="accent">
			<h3 className="text-lg sm:text-xl font-bold mb-1 text-blue-400 flex items-center gap-2">{t("apiKeySetup.title")}</h3>
			<p className="text-slate-400 text-sm mb-6">{t("apiKeySetup.subtitle")}</p>

			<Alert variant="info" className="mb-6">
				{t("apiKeySetup.securityNote")}
			</Alert>

			<div className="bg-slate-800/60 border border-blue-500/20 rounded-xl p-4 mb-6">
				<p className="text-sm font-semibold text-blue-300 mb-3">{t("apiKeySetup.howToGetTitle")}</p>
				<ol className="space-y-2 text-sm text-slate-300">
					<li className="flex items-start gap-2">
						<span className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
							1
						</span>
						<span>
							{t("apiKeySetup.step1")}{" "}
							<a
								href={OPENROUTER_CONFIG.keysUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="text-purple-300 underline hover:text-purple-200 font-semibold"
							>
								openrouter.ai/settings/keys ↗
							</a>
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
							2
						</span>
						<span>{t("apiKeySetup.step2")}</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
							3
						</span>
						<span>
							{t("apiKeySetup.step3Before")} <strong className="text-white">{t("apiKeySetup.step3CreateKey")}</strong>{" "}
							{t("apiKeySetup.step3After")} <code className="bg-slate-700 px-1 rounded text-xs">sk-or-...</code>)
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
							4
						</span>
						<span>
							{t("apiKeySetup.step4Before")} <code className="bg-slate-700 px-1 rounded text-xs">.txt</code> {t("apiKeySetup.step4After")}
						</span>
					</li>
				</ol>
			</div>

			<div className="mb-4">
				<label className="block text-sm text-blue-300 mb-2 font-semibold">{t("apiKeySetup.manualEntryLabel")}</label>
				<div className="flex gap-2">
					<input
						type={showKey ? "text" : "password"}
						value={apiKey}
						onChange={(e) => handleKeyInput(e.target.value)}
						maxLength={API_KEY_CONFIG.maxLength}
						placeholder="sk-or-v1-..."
						className="flex-1 bg-slate-900 border border-blue-500/30 rounded-lg px-4 py-3 text-white font-mono text-sm focus:border-blue-400 outline-none"
					/>
					<button
						type="button"
						onClick={() => setShowKey((v) => !v)}
						className="px-4 py-3 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg text-sm transition-all"
					>
						{showKey ? "🙈" : "👁"}
					</button>
				</div>
			</div>

			<div className="mb-6">
				<label className="block text-sm text-blue-300 mb-2 font-semibold">{t("apiKeySetup.orUploadLabel")}</label>
				<div className="flex items-center gap-3 flex-wrap">
					<input ref={fileInputRef} type="file" accept=".txt,text/plain" onChange={handleKeyFile} className="hidden" />
					<button
						type="button"
						onClick={() => fileInputRef.current?.click()}
						className="flex items-center gap-2 px-5 py-3 bg-slate-700 hover:bg-slate-600 border border-slate-500/40 text-slate-200 rounded-lg text-sm font-semibold transition-all"
					>
						{t("apiKeySetup.chooseFileButton")}
					</button>
					{apiKey && <span className="text-xs text-green-400 font-semibold">{t("apiKeySetup.keyLoaded")}</span>}
				</div>
				<p className="text-xs text-slate-500 mt-2">{t("apiKeySetup.fileHint")}</p>
			</div>

			<div className="bg-slate-800/40 rounded-xl p-4 mb-6">
				<p className="text-xs text-slate-400 mb-2 font-semibold">{t("apiKeySetup.freeModelsLabel")}</p>
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
					{FREE_VISION_MODELS.map((m, i) => (
						<div key={m} className="text-xs text-slate-500 flex items-center gap-1">
							<span className="text-slate-600">{i + 1}.</span>
							<span>{m.split("/")[1]}</span>
						</div>
					))}
				</div>
			</div>

			{keyError && (
				<Alert variant="error" className="mb-4">
					{keyError}
				</Alert>
			)}

			<button
				type="button"
				onClick={handleContinueClick}
				disabled={!canContinue}
				className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition-all"
			>
				{canContinue ? t("apiKeySetup.continueButton") : t("apiKeySetup.continueButtonDisabled")}
			</button>
		</Section>
	);
}
