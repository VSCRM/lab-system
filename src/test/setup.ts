import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import i18n from "@/i18n";

// jsdom's navigator.language defaults to "en-US", which would otherwise make
// i18next-browser-languagedetector pick English in every test run. Force the
// app's default language so component tests see the same text a real user
// visiting with no saved preference would see.
void i18n.changeLanguage("uk");

afterEach(() => {
	cleanup();
});
