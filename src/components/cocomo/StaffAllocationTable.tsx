import { useTranslation } from "react-i18next";
import { Trash2, UserPlus } from "lucide-react";
import type { EditableStaffMember } from "@/hooks/useStaffAllocation";
import type { StaffMember } from "@/lib/calculations/cocomoII";
import { formatNumber } from "@/lib/format";
import Alert from "@/components/ui/Alert";

interface StaffAllocationTableProps {
	staff: EditableStaffMember[];
	onUpdate: (id: string, patch: Partial<StaffMember>) => void;
	onAdd: () => void;
	onRemove: (id: string) => void;
	totalShare: number;
	avgRate: number;
}

/** Editable table of staff roles, rate, and share of effort — rows can be added/removed. Shared by Lab 5 and Lab 6. */
export default function StaffAllocationTable({ staff, onUpdate, onAdd, onRemove, totalShare, avgRate }: StaffAllocationTableProps) {
	const { t } = useTranslation("cocomo");

	return (
		<div className="overflow-x-auto">
			<table className="w-full text-left text-xs text-blue-100">
				<caption className="sr-only">{t("staffTable.caption")}</caption>
				<thead>
					<tr className="border-b border-blue-500/30">
						<th scope="col" className="pb-2">
							{t("staffTable.roleHeader")}
						</th>
						<th scope="col" className="pb-2">
							{t("staffTable.rateHeader")}
						</th>
						<th scope="col" className="pb-2">
							{t("staffTable.shareHeader")}
						</th>
						<th scope="col" className="pb-2 sr-only">
							{t("staffTable.actionsHeader")}
						</th>
					</tr>
				</thead>
				<tbody className="divide-y divide-blue-500/10">
					{staff.map((member) => (
						<tr key={member.id}>
							<td className="py-2 pr-2">
								<label className="sr-only" htmlFor={`staff-role-${member.id}`}>
									{t("staffTable.roleNameSr")}
								</label>
								<input
									id={`staff-role-${member.id}`}
									type="text"
									maxLength={40}
									value={member.role}
									onChange={(e) => onUpdate(member.id, { role: e.target.value })}
									className="w-28 bg-transparent border-b border-transparent hover:border-blue-500/30 focus:border-blue-400 text-blue-400 outline-none"
								/>
							</td>
							<td className="py-2 pr-2">
								<label className="sr-only" htmlFor={`staff-rate-${member.id}`}>
									{t("staffTable.rateSr", { role: member.role })}
								</label>
								<input
									id={`staff-rate-${member.id}`}
									type="number"
									min={0}
									value={member.rate}
									onChange={(e) => onUpdate(member.id, { rate: Number(e.target.value) || 0 })}
									className="w-20 bg-slate-900 border border-blue-500/20 rounded px-1 text-white"
								/>
							</td>
							<td className="py-2 pr-2">
								<label className="sr-only" htmlFor={`staff-share-${member.id}`}>
									{t("staffTable.shareSr", { role: member.role })}
								</label>
								<input
									id={`staff-share-${member.id}`}
									type="number"
									min={0}
									max={100}
									value={member.share}
									onChange={(e) => onUpdate(member.id, { share: Number(e.target.value) || 0 })}
									className="w-16 bg-slate-900 border border-blue-500/20 rounded px-1 text-white"
								/>
							</td>
							<td className="py-2">
								<button
									type="button"
									onClick={() => onRemove(member.id)}
									disabled={staff.length <= 1}
									aria-label={t("staffTable.removeRole", { role: member.role })}
									className="text-slate-500 hover:text-red-400 disabled:opacity-30 disabled:hover:text-slate-500 transition-colors p-1"
								>
									<Trash2 className="w-4 h-4" aria-hidden="true" />
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>

			<button
				type="button"
				onClick={onAdd}
				className="mt-3 flex items-center gap-1.5 text-xs text-blue-400 hover:text-yellow-400 font-semibold transition-colors"
			>
				<UserPlus className="w-3.5 h-3.5" aria-hidden="true" />
				{t("staffTable.addRole")}
			</button>

			<div className="mt-4 text-xs text-blue-300 space-y-1">
				<div>{t("staffTable.totalShare", { value: totalShare })}</div>
				<div>{t("staffTable.avgRate", { value: formatNumber(avgRate) })}</div>
			</div>

			{totalShare !== 100 && (
				<Alert variant="info" className="mt-3">
					{t("staffTable.shareWarning", { value: totalShare })}
				</Alert>
			)}
		</div>
	);
}
