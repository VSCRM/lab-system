import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

interface AppShellProps {
	children: ReactNode;
}

/**
 * Page chrome shared by every route: animated background + sticky header.
 * Content-specific concerns (lab list, lab detail) live in their own pages.
 */
export default function AppShell({ children }: AppShellProps) {
	const { t } = useTranslation();

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white selection:bg-yellow-500/30">
			<div className="fixed inset-0 overflow-hidden pointer-events-none opacity-10" aria-hidden="true">
				<div className="absolute top-0 left-0 w-72 h-72 sm:w-96 sm:h-96 bg-blue-500 rounded-full filter blur-3xl animate-pulse-slow" />
				<div className="absolute bottom-0 right-0 w-72 h-72 sm:w-96 sm:h-96 bg-yellow-500 rounded-full filter blur-3xl animate-pulse-slow [animation-delay:1s]" />
			</div>

			<div className="relative z-10">
				<a
					href="#main-content"
					className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-blue-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg"
				>
					{t("skipToContent")}
				</a>
				<Header />
				{children}
			</div>
		</div>
	);
}

function Header() {
	const { t } = useTranslation();

	return (
		<header className="border-b border-blue-500/30 backdrop-blur-sm bg-slate-900/50 sticky top-0 z-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 sm:py-8">
				<div className="flex items-center justify-between gap-3 sm:gap-4">
					<div className="flex items-center gap-3 sm:gap-4 min-w-0">
						<div className="w-1.5 sm:w-2 h-14 sm:h-20 bg-gradient-to-b from-blue-400 to-yellow-400 rounded-full shrink-0" />
						<div className="min-w-0">
							<h1 className="text-xl sm:text-3xl lg:text-4xl font-black tracking-tight bg-gradient-to-r from-blue-400 to-yellow-400 bg-clip-text text-transparent truncate">
								{t("appTitle")}
							</h1>
							<p className="text-blue-300 mt-1 sm:mt-2 font-mono text-[11px] sm:text-sm tracking-wider truncate">{t("appSubtitle")}</p>
						</div>
					</div>
					<LanguageSwitcher />
				</div>
			</div>
		</header>
	);
}
