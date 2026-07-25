import { useTranslation } from "react-i18next";
import NumberField from "@/components/ui/NumberField";
import type { UseValidatedNumberResult } from "@/hooks/useValidatedNumber";

export interface RatingFieldEntry {
	labelKey: string;
	field: UseValidatedNumberResult;
}

interface RatingsGridProps {
	entries: readonly RatingFieldEntry[];
}

/** Grid of the 5 COCOMO development-rating inputs (R1-R5) used in Lab 1. */
export default function RatingsGrid({ entries }: RatingsGridProps) {
	const { t } = useTranslation("lab1");

	return (
		<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
			{entries.map(({ labelKey, field }) => (
				<NumberField
					key={labelKey}
					label={t(labelKey)}
					value={field.raw}
					onChange={field.onChange}
					error={field.error}
					step="0.01"
					size="sm"
				/>
			))}
		</div>
	);
}
