import { create } from "zustand";

export type CounterStatus = "increment" | "decrement";

export type CounterStatusStore = {
	status: CounterStatus;
	setStatus: (status: CounterStatus) => void;
};

export const useCounterStatusStore = create<CounterStatusStore>((set) => ({
	status: "increment",
	setStatus: (status) => set({ status }),
}));
