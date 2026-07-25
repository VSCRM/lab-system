import { useId, type ChangeEvent } from "react";

export interface SelectOption<T extends string> {
	value: T;
	label: string;
}

interface SelectFieldProps<T extends string> {
	label: string;
	value: T;
	onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
	options: readonly SelectOption<T>[];
	hint?: string;
}

export default function SelectField<T extends string>({ label, value, onChange, options, hint }: SelectFieldProps<T>) {
	const id = useId();
	return (
		<div>
			<label htmlFor={id} className="field-label">
				{label}
			</label>
			<select id={id} value={value} onChange={onChange} className="field-input">
				{options.map((opt) => (
					<option key={opt.value} value={opt.value}>
						{opt.label}
					</option>
				))}
			</select>
			{hint && <p className="field-hint">{hint}</p>}
		</div>
	);
}
