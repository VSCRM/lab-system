import { Fragment, type KeyboardEvent } from "react";

export interface Step {
	n: number;
	label: string;
}

interface StepIndicatorProps {
	steps: readonly Step[];
	current: number;
	onStepClick?: (n: number) => void;
}

export default function StepIndicator({ steps, current, onStepClick }: StepIndicatorProps) {
	return (
		<div className="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Кроки аналізу">
			{steps.map(({ n, label }, i) => {
				const isDone = current > n;
				const isActive = current === n;
				const clickable = isDone && Boolean(onStepClick);

				const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
					if (clickable && onStepClick && (event.key === "Enter" || event.key === " ")) {
						onStepClick(n);
					}
				};

				return (
					<Fragment key={n}>
						<div
							role="tab"
							aria-selected={isActive}
							tabIndex={clickable ? 0 : -1}
							onClick={() => clickable && onStepClick?.(n)}
							onKeyDown={handleKeyDown}
							className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
								isActive
									? "bg-blue-600 text-white"
									: isDone
										? "bg-green-900/40 text-green-400 cursor-pointer"
										: "bg-slate-800/50 text-slate-500"
							}`}
						>
							<span
								className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-xs font-black ${
									isActive ? "bg-white text-blue-600" : isDone ? "bg-green-500 text-white" : "bg-slate-700 text-slate-400"
								}`}
							>
								{isDone ? "✓" : n}
							</span>
							{label}
						</div>
						{i < steps.length - 1 && <div className="w-4 sm:flex-1 h-px bg-slate-700 shrink-0" />}
					</Fragment>
				);
			})}
		</div>
	);
}
