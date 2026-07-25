import { useTranslation } from "react-i18next";
import type { CatalogFunction } from "@/lib/calculations/lab2";

interface FunctionCatalogListProps {
	functions: readonly CatalogFunction[];
	onToggle: (id: number) => void;
}

/** Checklist of catalog functions contributing LOC to the Lab 2 volume calculation. */
export default function FunctionCatalogList({ functions, onToggle }: FunctionCatalogListProps) {
	const { t } = useTranslation("lab2");

	return (
		<div className="space-y-2">
			{functions.map((func) => (
				<label
					key={func.id}
					className={`flex items-center justify-between p-3 rounded-lg transition-all cursor-pointer ${
						func.enabled ? "bg-blue-900/30 border border-blue-500/30" : "bg-slate-900/30 border border-slate-700/30"
					}`}
				>
					<span className="flex items-center gap-3 min-w-0">
						<input
							type="checkbox"
							checked={func.enabled}
							onChange={() => onToggle(func.id)}
							className="w-5 h-5 rounded border-blue-500/30 bg-slate-900 shrink-0"
						/>
						<span className="min-w-0">
							<span className="block text-white font-semibold text-sm sm:text-base truncate">
								#{func.id} - {t(`functions.${func.id}`)}
							</span>
							<span className="block text-xs text-slate-400">
								{func.loc} {t("catalog.locSuffix")}
							</span>
						</span>
					</span>
					<span className={`font-mono font-bold text-sm shrink-0 ml-2 ${func.enabled ? "text-yellow-400" : "text-slate-600"}`}>
						{func.loc} {t("catalog.linesSuffix")}
					</span>
				</label>
			))}
		</div>
	);
}
