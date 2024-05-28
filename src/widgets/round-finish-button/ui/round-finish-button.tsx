import { selectors, useMoneyStore } from "@/entity/money";
import { enrichmentClickHandler } from "@/shared/lib/enrichment-handler";
import type { ButtonProps } from "@/shared/ui/button";
import { MoneyChangeButton } from "@/shared/ui/money-change-button";
import { twMerge } from "tailwind-merge";

export const RoundFinishButton = ({ className, ...props }: ButtonProps) => {
	const changeMoney = useMoneyStore(selectors.getChangeMoneyAction);

	const handleClick = enrichmentClickHandler(() => {
		changeMoney(100, 2);
	}, props.onClick);

	return (
		<MoneyChangeButton
			{...props}
			label="+200"
			variant={"outline"}
			size={"lg"}
			className={twMerge(className)}
			onClick={handleClick}
		>
			Прошёл круг, дайте деняк
		</MoneyChangeButton>
	);
};
