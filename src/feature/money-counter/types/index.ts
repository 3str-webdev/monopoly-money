import type { Denomination, Money } from "@/entity/money";

export type ChangingMoneyState = {
	sum: number;
	changingDenomination: Denomination;
	changingMoney: Money;
};
