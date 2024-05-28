import type { CounterStatus } from "./counter-status-store";

export const getDenominationSymbol = (status?: CounterStatus) => {
	switch (status) {
		case "increment":
			return "+";
		case "decrement":
			return "-";
		default:
			return "";
	}
};
