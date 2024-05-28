import type { ButtonProps } from "@/shared/ui/button";
import type { CounterStatus } from "./counter-status-store";

export const getTakeMoneyButtonVariant = (
	status: CounterStatus,
): ButtonProps["variant"] => {
	if (status === "increment") {
		return "default";
	}

	return "outline";
};

export const getGiveMoneyButtonVariant = (
	status: CounterStatus,
): ButtonProps["variant"] => {
	if (status === "decrement") {
		return "default";
	}

	return "outline";
};
