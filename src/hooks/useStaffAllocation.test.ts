import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useStaffAllocation } from "./useStaffAllocation";

describe("useStaffAllocation", () => {
	it("assigns each initial member a stable, unique id", () => {
		const { result } = renderHook(() =>
			useStaffAllocation([
				{ role: "A", rate: 100, share: 50 },
				{ role: "B", rate: 200, share: 50 },
			]),
		);
		const ids = result.current.staff.map((m) => m.id);
		expect(new Set(ids).size).toBe(2);
	});

	it("updateMember patches only the targeted row by id", () => {
		const { result } = renderHook(() =>
			useStaffAllocation([
				{ role: "A", rate: 100, share: 50 },
				{ role: "B", rate: 200, share: 50 },
			]),
		);
		const targetId = result.current.staff[0]!.id;
		act(() => {
			result.current.updateMember(targetId, { rate: 999 });
		});
		expect(result.current.staff[0]!.rate).toBe(999);
		expect(result.current.staff[1]!.rate).toBe(200);
	});

	it("addMember appends a new row with a fresh id", () => {
		const { result } = renderHook(() => useStaffAllocation([{ role: "A", rate: 100, share: 100 }]));
		act(() => {
			result.current.addMember();
		});
		expect(result.current.staff).toHaveLength(2);
		expect(result.current.staff[1]!.id).not.toBe(result.current.staff[0]!.id);
	});

	it("removeMember removes the targeted row", () => {
		const { result } = renderHook(() =>
			useStaffAllocation([
				{ role: "A", rate: 100, share: 50 },
				{ role: "B", rate: 200, share: 50 },
			]),
		);
		const targetId = result.current.staff[0]!.id;
		act(() => {
			result.current.removeMember(targetId);
		});
		expect(result.current.staff).toHaveLength(1);
		expect(result.current.staff[0]!.role).toBe("B");
	});

	it("refuses to remove the last remaining row", () => {
		const { result } = renderHook(() => useStaffAllocation([{ role: "Solo", rate: 100, share: 100 }]));
		const onlyId = result.current.staff[0]!.id;
		act(() => {
			result.current.removeMember(onlyId);
		});
		expect(result.current.staff).toHaveLength(1);
	});

	it("totalShare sums the share of every row", () => {
		const { result } = renderHook(() =>
			useStaffAllocation([
				{ role: "A", rate: 100, share: 40 },
				{ role: "B", rate: 200, share: 35 },
			]),
		);
		expect(result.current.totalShare).toBe(75);
	});
});
