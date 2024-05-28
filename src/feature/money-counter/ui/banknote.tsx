import { type Denomination, selectors, useMoneyStore } from "@/entity/money";
import { enrichmentClickHandler } from "@/shared/lib/enrichment-handler";
import type { ButtonHTMLAttributes } from "react";
import { twJoin } from "tailwind-merge";
import type { CounterStatus } from "../model/counter-status-store";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";

type BanknoteProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	denomination: Denomination;
	status: CounterStatus;
};

export const Banknote = ({
	denomination,
	status,
	className,
	...props
}: BanknoteProps) => {
	const changeMoney = useMoneyStore(selectors.getChangeMoneyAction);
	const specificMoney = useMoneyStore(
		selectors.getMoneyByDenomination(denomination),
	);

	const denominationSymbol = status === "increment" ? "+" : "-";
	const isDisables = status === "decrement" && specificMoney === 0;

	const handleClick = enrichmentClickHandler(() => {
		if (status === "increment") {
			return changeMoney(denomination, 1);
		}

		if (specificMoney > 0) {
			return changeMoney(denomination, -1);
		}
	}, props.onClick);

	return (
		<Button
			{...props}
			variant={"outline"}
			className={twJoin(
				"relative",
				"rounded-md p-2 min-w-[130px] max-w-[150px] h-[80px]",
				"grid place-items-center",
				"disabled:opacity-50",
				className,
			)}
			onClick={handleClick}
			disabled={isDisables}
		>
			<Badge className="absolute top-0 right-0">{specificMoney}</Badge>
			<div className="text-xl">
				{denominationSymbol}
				{denomination}
			</div>
		</Button>
	);
};
