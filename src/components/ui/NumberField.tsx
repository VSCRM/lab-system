import { useId, type ChangeEvent, type InputHTMLAttributes } from "react";
import { AlertCircle } from "lucide-react";

interface NumberFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange" | "size" | "type"> {
	label: string;
	hint?: string;
	error?: string | null;
	value: string;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
	step?: string | number;
	size?: "sm" | "md";
}

/**
 * Controlled numeric input. Purely presentational — validation state
 * (raw value / parsed value / error) is owned by useValidatedNumber and
 * passed in, keeping this component reusable and easy to test.
 */
export default function NumberField({
	label,
	hint,
	error,
	value,
	onChange,
	step = "any",
	disabled = false,
	size = "md",
	...rest
}: NumberFieldProps) {
	const id = useId();
	const errorId = `${id}-error`;
	const hintId = `${id}-hint`;

	return (
		<div>
			<label htmlFor={id} className={size === "sm" ? "block text-xs text-blue-300 mb-1" : "field-label"}>
				{label}
			</label>
			<input
				id={id}
				type="number"
				inputMode="decimal"
				step={step}
				value={value}
				onChange={onChange}
				disabled={disabled}
				aria-invalid={Boolean(error)}
				aria-describedby={error ? errorId : hint ? hintId : undefined}
				className={`field-input ${size === "sm" ? "!py-2 !px-3 text-sm" : ""} ${error ? "field-input-invalid" : ""}`}
				{...rest}
			/>
			{error ? (
				<p id={errorId} className="field-error" role="alert">
					<AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
					{error}
				</p>
			) : hint ? (
				<p id={hintId} className="field-hint">
					{hint}
				</p>
			) : null}
		</div>
	);
}
