import type { ReactNode } from "react";

interface ResultStatProps {
	label: string;
	value: ReactNode;
	unit?: string;
	highlight?: boolean;
}

export default function ResultStat({ label, value, unit, highlight = false }: ResultStatProps) {
	return (
		<div className="bg-slate-900/50 rounded-lg p-4 text-center border border-white/5">
			<div className="text-[11px] sm:text-xs text-blue-300 mb-1 uppercase tracking-wide">{label}</div>
			<div className={`text-xl sm:text-2xl font-bold ${highlight ? "text-yellow-400" : "text-white"}`}>{value}</div>
			{unit && <div className="text-[11px] sm:text-xs text-slate-400 mt-0.5">{unit}</div>}
		</div>
	);
}
