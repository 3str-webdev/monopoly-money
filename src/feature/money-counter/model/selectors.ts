import type { CounterStatusStore } from "./counter-status-store";

const getCounterStatus = (store: CounterStatusStore) => {
	return store.status;
};

const getCounterStatusSetter = (store: CounterStatusStore) => {
	return store.setStatus;
};

export const selectors = {
	getCounterStatus,
	getCounterStatusSetter,
};
