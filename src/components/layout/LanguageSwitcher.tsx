import { useTranslation } from "react-i18next";
import { SUPPORTED_LANGUAGES, type SupportedLanguage } from "@/i18n";

export default function LanguageSwitcher() {
	const { t, i18n } = useTranslation();
	const current = (i18n.resolvedLanguage ?? "uk") as SupportedLanguage;

	return (
		<div
			role="group"
			aria-label={t("languageSwitcher.label")}
			className="flex items-center gap-1 rounded-lg bg-slate-800/60 p-1 text-xs font-semibold"
		>
			{SUPPORTED_LANGUAGES.map((lng) => (
				<button
					key={lng}
					type="button"
					onClick={() => void i18n.changeLanguage(lng)}
					aria-pressed={current === lng}
					className={`rounded-md px-2.5 py-1.5 transition-colors ${
						current === lng ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"
					}`}
				>
					{lng.toUpperCase()}
				</button>
			))}
		</div>
	);
}
