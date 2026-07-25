import { useCallback, useState } from "react";
import type { StaffMember } from "@/lib/calculations/cocomoII";

/**
 * A staff row as edited in the UI. Adds a stable `id` on top of the plain
 * calculation-facing `StaffMember` shape, since `role` (a free-text label)
 * is no longer safe to use as a React list key once rows can be renamed,
 * added, or removed.
 */
export interface EditableStaffMember extends StaffMember {
	id: string;
}

export interface UseStaffAllocationResult {
	staff: EditableStaffMember[];
	updateMember: (id: string, patch: Partial<StaffMember>) => void;
	addMember: () => void;
	removeMember: (id: string) => void;
	totalShare: number;
}

let nextId = 0;
function generateId(): string {
	nextId += 1;
	return `staff-${nextId}`;
}

const DEFAULT_STAFF: StaffMember[] = [
	{ role: "Розробник", rate: 800, share: 50 },
	{ role: "Аналітик", rate: 900, share: 20 },
	{ role: "Тестувальник", rate: 600, share: 30 },
];

export function useStaffAllocation(initial: StaffMember[] = DEFAULT_STAFF): UseStaffAllocationResult {
	const [staff, setStaff] = useState<EditableStaffMember[]>(() => initial.map((member) => ({ ...member, id: generateId() })));

	const updateMember = useCallback((id: string, patch: Partial<StaffMember>) => {
		setStaff((prev) => prev.map((member) => (member.id === id ? { ...member, ...patch } : member)));
	}, []);

	const addMember = useCallback(() => {
		setStaff((prev) => [...prev, { id: generateId(), role: "Новий виконавець", rate: 500, share: 0 }]);
	}, []);

	const removeMember = useCallback((id: string) => {
		setStaff((prev) => (prev.length > 1 ? prev.filter((member) => member.id !== id) : prev));
	}, []);

	const totalShare = staff.reduce((sum, member) => sum + member.share, 0);

	return { staff, updateMember, addMember, removeMember, totalShare };
}
