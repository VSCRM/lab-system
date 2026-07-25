import type { ReactNode } from "react";
import { AlertTriangle, Info, CheckCircle2, type LucideIcon } from "lucide-react";

type AlertVariant = "error" | "info" | "success";

const STYLES: Record<AlertVariant, { wrap: string; Icon: LucideIcon }> = {
	error: { wrap: "bg-red-900/30 border-red-500/30 text-red-300", Icon: AlertTriangle },
	info: { wrap: "bg-blue-900/20 border-blue-500/30 text-blue-300", Icon: Info },
	success: { wrap: "bg-green-900/20 border-green-500/20 text-green-400", Icon: CheckCircle2 },
};

interface AlertProps {
	variant?: AlertVariant;
	children: ReactNode;
	className?: string;
}

export default function Alert({ variant = "info", children, className = "" }: AlertProps) {
	const { wrap, Icon } = STYLES[variant];
	return (
		<div
			role={variant === "error" ? "alert" : "status"}
			className={`flex items-start gap-2 p-3 sm:p-4 border rounded-lg text-xs sm:text-sm whitespace-pre-wrap ${wrap} ${className}`}
		>
			<Icon className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
			<div>{children}</div>
		</div>
	);
}
