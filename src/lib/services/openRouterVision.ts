import { OPENROUTER_CONFIG } from "@/lib/config";

export const FREE_VISION_MODELS = OPENROUTER_CONFIG.freeVisionModels;

interface OpenRouterErrorBody {
	error?: { message?: string };
}

interface OpenRouterChatResponse {
	choices?: { message?: { content?: string } }[];
}

function modelShortName(model: string): string {
	return model.split("/")[1] ?? model;
}

async function callModel(model: string, prompt: string, apiKey: string, base64Image: string, mimeType: string): Promise<string> {
	const controller = new AbortController();
	const timeoutId = setTimeout(() => controller.abort(), OPENROUTER_CONFIG.requestTimeoutMs);

	try {
		const response = await fetch(OPENROUTER_CONFIG.apiUrl, {
			method: "POST",
			signal: controller.signal,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${apiKey}`,
				"HTTP-Referer": OPENROUTER_CONFIG.referer,
				"X-Title": OPENROUTER_CONFIG.appTitle,
			},
			body: JSON.stringify({
				model,
				messages: [
					{
						role: "user",
						content: [
							{ type: "text", text: prompt },
							{ type: "image_url", image_url: { url: `data:${mimeType};base64,${base64Image}` } },
						],
					},
				],
				max_tokens: OPENROUTER_CONFIG.maxTokens,
			}),
		});

		if (!response.ok) {
			const body: unknown = await response.json().catch(() => null);
			const message = (body as OpenRouterErrorBody | null)?.error?.message;
			throw new Error(message ?? `HTTP ${response.status}`);
		}

		const data = (await response.json()) as OpenRouterChatResponse;
		const content = data.choices?.[0]?.message?.content;
		if (!content) throw new Error("Порожня відповідь від моделі");
		return content;
	} catch (error) {
		if (error instanceof DOMException && error.name === "AbortError") {
			throw new Error(`Перевищено час очікування відповіді (${OPENROUTER_CONFIG.requestTimeoutMs / 1000}с)`);
		}
		throw error;
	} finally {
		clearTimeout(timeoutId);
	}
}

/**
 * Try every free vision model in order until one succeeds, reporting the
 * currently attempted model via onModelTrying so the UI can show progress.
 */
export async function analyzeImageWithFailover(
	prompt: string,
	apiKey: string,
	base64Image: string,
	mimeType: string,
	onModelTrying: (modelName: string) => void,
): Promise<string> {
	const errors: string[] = [];
	for (const model of FREE_VISION_MODELS) {
		onModelTrying(modelShortName(model));
		try {
			const content = await callModel(model, prompt, apiKey, base64Image, mimeType);
			onModelTrying("");
			return content;
		} catch (error) {
			const message = error instanceof Error ? error.message : "Невідома помилка";
			errors.push(`${modelShortName(model)}: ${message}`);
		}
	}
	onModelTrying("");
	throw new Error("Всі моделі недоступні:\n" + errors.join("\n"));
}
