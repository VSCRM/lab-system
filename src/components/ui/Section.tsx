import type { ReactNode } from "react";

interface SectionProps {
	title?: string;
	children: ReactNode;
	variant?: "default" | "accent" | "result";
	className?: string;
}

export default function Section({ title, children, variant = "default", className = "" }: SectionProps) {
	const variantClass =
		variant === "result"
			? "result-hero"
			: variant === "accent"
				? "bg-gradient-to-r from-blue-900/50 to-yellow-900/30 backdrop-blur-sm border border-blue-500/30 rounded-2xl p-5 sm:p-8"
				: "glass-card";

	return (
		<section className={`${variantClass} ${className}`}>
			{title && (
				<h3
					className={
						variant === "result"
							? "text-xl sm:text-2xl font-black mb-4 sm:mb-6 text-yellow-400"
							: "text-lg sm:text-xl font-bold mb-4 text-yellow-400"
					}
				>
					{title}
				</h3>
			)}
			{children}
		</section>
	);
}
