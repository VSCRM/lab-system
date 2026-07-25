import Section from "@/components/ui/Section";

interface LabHeaderProps {
	title: string;
	subtitle: string;
}

/** Accent header block shown at the top of every lab page. */
export default function LabHeader({ title, subtitle }: LabHeaderProps) {
	return (
		<Section variant="accent">
			<h2 className="text-2xl sm:text-3xl font-black mb-2 bg-gradient-to-r from-blue-400 to-yellow-400 bg-clip-text text-transparent">
				{title}
			</h2>
			<p className="text-blue-300 text-sm sm:text-base">{subtitle}</p>
		</Section>
	);
}
