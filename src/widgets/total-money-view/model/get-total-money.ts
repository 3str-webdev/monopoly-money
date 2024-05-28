import type { Denomination, Money } from "@/entity/money";

export const getTotalMoney = (money: Money) => {
	const keys = Object.keys(money) as unknown as Denomination[];

	return keys.reduce((acc, item) => acc + money[item] * item, 0);
};
