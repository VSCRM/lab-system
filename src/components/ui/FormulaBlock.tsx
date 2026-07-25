import type { ReactNode } from "react";

interface FormulaBlockProps {
	formula: string;
	steps?: ReactNode[];
	result: ReactNode;
	size?: "sm" | "lg";
}

export default function FormulaBlock({ formula, steps = [], result, size = "sm" }: FormulaBlockProps) {
	return (
		<div className="bg-slate-900/50 rounded-lg p-4 font-mono text-xs sm:text-sm overflow-x-auto">
			<div className="text-blue-300 mb-2 whitespace-nowrap sm:whitespace-normal">{formula}</div>
			{steps.map((step, i) => (
				<div key={i} className="text-white break-words">
					{step}
				</div>
			))}
			<div
				className={`font-bold text-yellow-400 mt-2 ${size === "lg" ? "text-2xl sm:text-3xl pt-3 border-t border-yellow-500/30" : "text-lg sm:text-xl"}`}
			>
				{result}
			</div>
		</div>
	);
}
