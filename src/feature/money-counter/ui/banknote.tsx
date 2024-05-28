import { type Denomination, selectors, useMoneyStore } from "@/entity/money";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import type { ButtonHTMLAttributes } from "react";
import { twJoin } from "tailwind-merge";
import { useLongPress } from "use-long-press";
import type { CounterStatus } from "../model/counter-status-store";
import { getDenominationSymbol } from "../model/get-denomination-symbol";

type BanknoteProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	denomination: Denomination;
	status?: CounterStatus;
	amountOfBanknotes: number;
	onLongPress?: () => void;
};

export const Banknote = ({
	denomination,
	status,
	amountOfBanknotes,
	className,
	onLongPress = () => {},
	...props
}: BanknoteProps) => {
	const bind = useLongPress(onLongPress);

	const isDisabled = status === "decrement" && amountOfBanknotes === 0;

	return (
		<Button
			{...props}
			{...bind()}
			variant={"outline"}
			className={twJoin(
				"relative",
				"rounded-md p-2 min-w-[130px] max-w-[150px] h-[80px]",
				"grid place-items-center",
				"disabled:opacity-50",
				className,
			)}
			disabled={isDisabled || props.disabled}
		>
			<Badge className="absolute top-0 right-0">{amountOfBanknotes}</Badge>
			<div className="text-xl">
				{getDenominationSymbol(status)}
				{denomination}
			</div>
		</Button>
	);
};
