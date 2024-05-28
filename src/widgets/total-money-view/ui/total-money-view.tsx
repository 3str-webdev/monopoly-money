import { selectors, useMoneyStore } from "@/entity/money";
import { twMerge } from "tailwind-merge";
import { getTotalMoney } from "../model/get-total-money";

export const TotalMoneyView = () => {
	const money = useMoneyStore(selectors.getMoney);

	const totalMoney = getTotalMoney(money);

	return <div className={twMerge("text-[60px] text-center")}>{totalMoney}</div>;
};
