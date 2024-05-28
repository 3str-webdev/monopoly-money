import { create } from "zustand";

export type Denomination = 500 | 100 | 50 | 20 | 10 | 5 | 1;

export type Money = Record<Denomination, number>;

export type MoneyStore = {
	money: Money;
	changeMoney: (denomination: Denomination, amount: number) => void;
};

export const useMoneyStore = create<MoneyStore>((set, get) => ({
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
}));
