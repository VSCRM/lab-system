import { useCallback, useState, type ChangeEvent } from "react";
import { analyzeImageWithFailover } from "@/lib/services/openRouterVision";
import { extractJsonObject } from "@/lib/calculations/lab4";
import { IMAGE_UPLOAD_CONFIG } from "@/lib/config";

export interface VisionAnalysisState<T extends Record<string, number>> {
	preview: string | null;
	analyzing: boolean;
	error: string;
	modelTrying: string;
	fields: T | null;
	explanation: string;
}

export interface UseVisionAnalysisResult<T extends Record<string, number>> extends VisionAnalysisState<T> {
	handleFile: (event: ChangeEvent<HTMLInputElement>) => void;
	analyze: (apiKey: string, prompt: string, parse: (raw: Record<string, unknown>) => T | null) => Promise<void>;
	reset: () => void;
	hasImage: boolean;
}

function initialState<T extends Record<string, number>>(): VisionAnalysisState<T> {
	return { preview: null, analyzing: false, error: "", modelTrying: "", fields: null, explanation: "" };
}

export function useVisionAnalysis<T extends Record<string, number>>(): UseVisionAnalysisResult<T> {
	const [state, setState] = useState<VisionAnalysisState<T>>(initialState<T>());

	const handleFile = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (!file) return;

		if (!IMAGE_UPLOAD_CONFIG.allowedMimeTypes.has(file.type)) {
			setState((prev) => ({ ...prev, error: "Непідтримуваний формат файлу. Дозволено: PNG, JPEG, WEBP, GIF." }));
			return;
		}
		if (file.size > IMAGE_UPLOAD_CONFIG.maxBytes) {
			setState((prev) => ({ ...prev, error: `Файл завеликий. Максимальний розмір — ${IMAGE_UPLOAD_CONFIG.maxBytes / (1024 * 1024)} МБ.` }));
			return;
		}

		setState((prev) => ({ ...prev, error: "", fields: null, explanation: "" }));
		const reader = new FileReader();
		reader.onerror = () => {
			setState((prev) => ({ ...prev, error: "Не вдалося прочитати файл зображення." }));
		};
		reader.onloadend = () => {
			setState((prev) => ({ ...prev, preview: typeof reader.result === "string" ? reader.result : null }));
		};
		reader.readAsDataURL(file);
	}, []);

	const analyze = useCallback(
		async (apiKey: string, prompt: string, parse: (raw: Record<string, unknown>) => T | null) => {
			if (!state.preview) return;
			setState((prev) => ({ ...prev, analyzing: true, error: "" }));
			try {
				const [meta, base64] = state.preview.split(",");
				const mime = meta?.split(";")[0]?.split(":")[1] ?? "image/jpeg";
				if (!base64) throw new Error("Не вдалося прочитати зображення");

				const content = await analyzeImageWithFailover(prompt, apiKey, base64, mime, (modelTrying) =>
					setState((prev) => ({ ...prev, modelTrying })),
				);

				const parsed = extractJsonObject(content);
				if (!parsed) throw new Error("Не вдалося розпізнати JSON-відповідь моделі");

				const fields = parse(parsed);
				if (!fields) throw new Error("Відповідь моделі не містить очікуваних полів");

				const explanation = typeof parsed["explanation"] === "string" ? (parsed["explanation"] as string) : "";
				setState((prev) => ({ ...prev, fields, explanation, analyzing: false }));
			} catch (error) {
				const message = error instanceof Error ? error.message : "Невідома помилка";
				setState((prev) => ({ ...prev, error: message, analyzing: false }));
			}
		},
		[state.preview],
	);

	const reset = useCallback(() => setState(initialState<T>()), []);

	return { ...state, handleFile, analyze, reset, hasImage: state.preview !== null };
}
