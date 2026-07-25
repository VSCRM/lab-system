import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useCocomoDrivers } from "./useCocomoDrivers";
import { nominalCostDrivers, type ScaleFactors } from "@/constants/cocomo";

const SCALE_FACTORS: ScaleFactors = { prec: 1, flex: 1, resl: 1, team: 1, pmat: 1 };

describe("useCocomoDrivers", () => {
	it("exposes raw string values matching the initial numbers", () => {
		const { result } = renderHook(() => useCocomoDrivers(SCALE_FACTORS, nominalCostDrivers()));
		expect(result.current.scaleFactorRaw.prec).toBe("1");
		expect(result.current.driverRaw.rely).toBe("1");
	});

	it("updates the numeric value on a valid scale-factor change", () => {
		const { result } = renderHook(() => useCocomoDrivers(SCALE_FACTORS, nominalCostDrivers()));
		act(() => {
			result.current.updateScaleFactor("prec", "5");
		});
		expect(result.current.scaleFactors.prec).toBe(5);
		expect(result.current.scaleFactorErrors.prec).toBeNull();
	});

	it("surfaces a Zod error for an out-of-range scale factor (>10)", () => {
		const { result } = renderHook(() => useCocomoDrivers(SCALE_FACTORS, nominalCostDrivers()));
		act(() => {
			result.current.updateScaleFactor("prec", "999");
		});
		expect(result.current.scaleFactorErrors.prec).not.toBeNull();
	});

	it("surfaces a Zod error for a cost driver outside 0.3-1.6", () => {
		const { result } = renderHook(() => useCocomoDrivers(SCALE_FACTORS, nominalCostDrivers()));
		act(() => {
			result.current.updateDriver("rely", "5");
		});
		expect(result.current.driverErrors.rely).not.toBeNull();
	});

	it("falls back to the initial value for the computed number when input is invalid", () => {
		const { result } = renderHook(() => useCocomoDrivers(SCALE_FACTORS, nominalCostDrivers()));
		act(() => {
			result.current.updateDriver("rely", "abc");
		});
		expect(result.current.drivers.rely).toBe(1); // initial nominal value
		expect(result.current.driverErrors.rely).not.toBeNull();
	});
});
