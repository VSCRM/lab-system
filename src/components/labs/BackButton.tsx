import { Link } from "react-router";
import { useTranslation } from "react-i18next";

export default function BackButton() {
	const { t } = useTranslation();

	return (
		<Link
			to="/"
			className="mb-6 sm:mb-8 inline-flex items-center gap-2 text-blue-400 hover:text-yellow-400 focus-visible:text-yellow-400 transition-colors font-bold group"
		>
			<span className="text-2xl group-hover:-translate-x-1 transition-transform" aria-hidden="true">
				←
			</span>
			{t("backToList")}
		</Link>
	);
}
