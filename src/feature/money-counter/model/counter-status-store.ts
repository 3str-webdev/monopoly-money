import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CounterStatus = "increment" | "decrement";

export type CounterStatusStore = {
	status: CounterStatus;
	setStatus: (status: CounterStatus) => void;
};

export const useCounterStatusStore = create<CounterStatusStore>()(
	persist(
		(set) => ({
			status: "increment",
			setStatus: (status) => set({ status }),
		}),
		{
			name: "mm-counter-status",
		},
	),
);
