import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { SearchX } from "lucide-react";

export default function NotFoundPage() {
	const { t } = useTranslation();

	return (
		<main className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
			<SearchX className="w-14 h-14 text-blue-400 mx-auto mb-6" aria-hidden="true" />
			<h1 className="text-2xl sm:text-3xl font-black mb-3">{t("notFound.title")}</h1>
			<p className="text-slate-400 mb-8">{t("notFound.description")}</p>
			<Link
				to="/"
				className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-all"
			>
				{t("notFound.homeLink")}
			</Link>
		</main>
	);
}
