let captureExceptionFn: ((error: unknown, hint?: { extra?: Record<string, unknown> }) => void) | null = null;

/**
 * Initializes Sentry error monitoring if VITE_SENTRY_DSN is configured.
 * The SDK itself is dynamically imported so it costs zero bytes on the
 * critical entry bundle for the (majority) case where no DSN is set —
 * only forks/deployments that actually configure Sentry pay for it, and
 * even then it loads as its own lazy chunk instead of blocking first paint.
 * Call once, before rendering the app (see src/main.tsx).
 */
export async function initErrorMonitoring(): Promise<void> {
	const dsn = import.meta.env.VITE_SENTRY_DSN;
	if (!dsn) {
		if (import.meta.env.DEV) {
			console.info("[monitoring] VITE_SENTRY_DSN not set — error monitoring disabled (this is expected in local dev).");
		}
		return;
	}

	const Sentry = await import("@sentry/react");
	Sentry.init({
		dsn,
		environment: import.meta.env.MODE,
		// Keep this low/zero by default — tracing isn't needed for a static
		// calculator app and would add third-party request volume.
		tracesSampleRate: 0,
		sendDefaultPii: false,
	});
	captureExceptionFn = (error, hint) => Sentry.captureException(error, hint);
}

/**
 * Reports a caught error to Sentry (if initialized) and always logs it to
 * the console as a fallback. Used by ErrorBoundary and other catch sites
 * instead of a bare `console.error` so production crashes are visible
 * somewhere other than a user's local devtools.
 */
export function reportError(error: unknown, context?: Record<string, unknown>): void {
	console.error("[reportError]", error, context);
	captureExceptionFn?.(error, context ? { extra: context } : undefined);
}
