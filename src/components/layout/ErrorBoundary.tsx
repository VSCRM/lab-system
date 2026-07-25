import { Component, type ErrorInfo, type ReactNode } from "react";
import { AlertOctagon } from "lucide-react";
import { reportError } from "@/lib/monitoring";
// Imported for its side effect (i18n.init) so this class component can call
// i18n.t() directly — react-i18next's hooks/HOCs aren't usable here without
// forcing every consumer to wrap ErrorBoundary in an I18nextProvider, which
// would be an awkward requirement for a generic error-boundary component.
import i18n from "@/i18n";

interface ErrorBoundaryProps {
	children: ReactNode;
	onReset?: () => void;
}

interface ErrorBoundaryState {
	error: Error | null;
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
	override state: ErrorBoundaryState = { error: null };

	static getDerivedStateFromError(error: Error): ErrorBoundaryState {
		return { error };
	}

	override componentDidCatch(error: Error, info: ErrorInfo): void {
		reportError(error, { componentStack: info.componentStack ?? undefined });
	}

	handleReset = (): void => {
		this.setState({ error: null });
		this.props.onReset?.();
	};

	override render(): ReactNode {
		if (this.state.error) {
			return (
				<div className="glass-card border-red-500/30 text-center py-12">
					<AlertOctagon className="w-12 h-12 text-red-400 mx-auto mb-4" aria-hidden="true" />
					<h2 className="text-xl font-bold text-red-300 mb-2">{i18n.t("errorBoundary.title")}</h2>
					<p className="text-slate-400 text-sm mb-6 max-w-md mx-auto">{i18n.t("errorBoundary.description")}</p>
					<button
						type="button"
						onClick={this.handleReset}
						className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors"
					>
						{i18n.t("errorBoundary.reset")}
					</button>
				</div>
			);
		}
		return this.props.children;
	}
}
