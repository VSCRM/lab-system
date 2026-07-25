import { LABS } from "@/constants/labs";
import LabCard from "./LabCard";

export default function LabGrid() {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
			{LABS.map((lab, index) => (
				<LabCard key={lab.id} lab={lab} index={index} />
			))}
		</div>
	);
}
