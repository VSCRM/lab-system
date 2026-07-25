import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import ukCommon from "./locales/uk/common.json";
import ukLab1 from "./locales/uk/lab1.json";
import ukLab2 from "./locales/uk/lab2.json";
import ukLab3 from "./locales/uk/lab3.json";
import ukLab4 from "./locales/uk/lab4.json";
import ukLab5 from "./locales/uk/lab5.json";
import ukLab6 from "./locales/uk/lab6.json";
import ukCocomo from "./locales/uk/cocomo.json";
import enCommon from "./locales/en/common.json";
import enLab1 from "./locales/en/lab1.json";
import enLab2 from "./locales/en/lab2.json";
import enLab3 from "./locales/en/lab3.json";
import enLab4 from "./locales/en/lab4.json";
import enLab5 from "./locales/en/lab5.json";
import enLab6 from "./locales/en/lab6.json";
import enCocomo from "./locales/en/cocomo.json";

export const SUPPORTED_LANGUAGES = ["uk", "en"] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

void i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		fallbackLng: "uk",
		supportedLngs: SUPPORTED_LANGUAGES,
		defaultNS: "common",
		ns: ["common", "lab1", "lab2", "lab3", "lab4", "lab5", "lab6", "cocomo"],
		resources: {
			uk: { common: ukCommon, lab1: ukLab1, lab2: ukLab2, lab3: ukLab3, lab4: ukLab4, lab5: ukLab5, lab6: ukLab6, cocomo: ukCocomo },
			en: { common: enCommon, lab1: enLab1, lab2: enLab2, lab3: enLab3, lab4: enLab4, lab5: enLab5, lab6: enLab6, cocomo: enCocomo },
		},
		interpolation: {
			// React already escapes output, so double-escaping via i18next is redundant.
			escapeValue: false,
		},
		detection: {
			order: ["localStorage", "navigator"],
			caches: ["localStorage"],
			lookupLocalStorage: "lab-system-language",
		},
	});

export default i18n;
