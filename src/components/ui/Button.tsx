import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "success" | "ghost" | "link";

const VARIANTS: Record<ButtonVariant, string> = {
	primary: "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white",
	success: "bg-gradient-to-r from-green-700 to-blue-700 hover:from-green-800 hover:to-blue-800 text-white",
	ghost: "bg-slate-700 hover:bg-slate-600 text-slate-300",
	link: "text-blue-400 hover:text-yellow-400 underline-offset-2",
};

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
	variant?: ButtonVariant;
	loading?: boolean;
	loadingLabel?: string;
	children: ReactNode;
}

export default function Button({
	variant = "primary",
	loading = false,
	loadingLabel = "Завантаження...",
	children,
	className = "",
	disabled,
	...rest
}: ButtonProps) {
	return (
		<button
			type="button"
			disabled={disabled || loading}
			className={`w-full font-bold py-3 px-6 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed ${VARIANTS[variant]} ${className}`}
			{...rest}
		>
			{loading ? (
				<span className="flex items-center justify-center gap-2">
					<svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
						<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
						<path
							className="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
						/>
					</svg>
					{loadingLabel}
				</span>
			) : (
				children
			)}
		</button>
	);
}
