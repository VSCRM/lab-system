import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { ChevronRight } from "lucide-react";
import type { LabMeta } from "@/constants/labs";

interface LabCardProps {
	lab: LabMeta;
	index: number;
}

export default function LabCard({ lab, index }: LabCardProps) {
	const { t } = useTranslation();
	const Icon = lab.icon;
	const title = t(`labs.${lab.slug}.title`);
	const subtitle = t(`labs.${lab.slug}.subtitle`);

	return (
		<Link
			to={`/lab/${lab.slug}`}
			className="group relative bg-slate-800/50 backdrop-blur-sm border-2 border-transparent hover:border-blue-500/50 focus-visible:border-yellow-400 focus-visible:outline-none rounded-2xl p-6 text-left transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl hover:shadow-blue-500/20 animate-fade-in-up"
			style={{ animationDelay: `${index * 80}ms` }}
		>
			<div
				className="absolute -top-4 -left-4 w-12 h-12 rounded-xl flex items-center justify-center font-black text-2xl shadow-lg"
				style={{ backgroundColor: lab.color, color: "#000" }}
				aria-hidden="true"
			>
				{lab.id}
			</div>

			<div className="mb-4 mt-4">
				<Icon className="w-10 h-10 sm:w-12 sm:h-12 text-blue-400 group-hover:text-yellow-400 transition-colors" aria-hidden="true" />
			</div>

			<h3 className="text-lg sm:text-xl font-bold mb-2 text-white group-hover:text-blue-300 transition-colors">{title}</h3>

			<p className="text-slate-400 text-sm mb-4">{subtitle}</p>

			<div className="flex items-center text-blue-400 text-sm font-semibold">
				<span>{t("calculate")}</span>
				<ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
			</div>

			<div className="absolute bottom-0 right-0 w-28 h-28 sm:w-32 sm:h-32 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
				<Icon className="w-full h-full" aria-hidden="true" />
			</div>
		</Link>
	);
}
