import { create } from "zustand";
import type { Denomination, Money } from "../types";
import { persist } from "zustand/middleware";

export type MoneyStore = {
	money: Money;
	changeMoney: (denomination: Denomination, amount: number) => void;
};

export const useMoneyStore = create<MoneyStore>()(
	persist(
		(set, get) => ({
			money: {
				500: 0,
				100: 0,
				50: 0,
				20: 0,
				10: 0,
				5: 0,
				1: 0,
			},

			changeMoney: (denomination: Denomination, amount: number) => {
				set({
					money: {
						...get().money,
						[denomination]: get().money[denomination] + amount,
					},
				});
			},
		}),
		{
			name: "mm-money",
		},
	),
);
