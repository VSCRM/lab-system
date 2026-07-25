/**
 * Central place for values that were previously hardcoded inline across
 * multiple files (API endpoints, timeouts, upload limits). Change the
 * provider or tune limits here instead of hunting through service/hook code.
 */

export const OPENROUTER_CONFIG = {
	apiUrl: "https://openrouter.ai/api/v1/chat/completions",
	keysUrl: "https://openrouter.ai/settings/keys",
	requestTimeoutMs: 30_000,
	maxTokens: 500,
	referer: "https://localhost",
	appTitle: "Lab4 FPA",
	freeVisionModels: [
		"nvidia/nemotron-nano-12b-v2-vl:free",
		"mistralai/mistral-small-3.1-24b-instruct:free",
		"google/gemma-3-27b-it:free",
		"google/gemma-3-4b-it:free",
		"google/gemma-3-12b-it:free",
	] as readonly string[],
} as const;

export const IMAGE_UPLOAD_CONFIG = {
	maxBytes: 8 * 1024 * 1024, // 8 MB
	allowedMimeTypes: new Set(["image/png", "image/jpeg", "image/webp", "image/gif"]),
} as const;

export const API_KEY_CONFIG = {
	maxLength: 200,
	maxKeyFileBytes: 4096,
} as const;
