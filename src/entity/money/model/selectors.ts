import type { Denomination, MoneyStore } from "./money-store";

const getMoney = (store: MoneyStore) => {
	return store.money;
};

const getMoneyByDenomination = (denomination: Denomination) => {
	return (store: MoneyStore) => {
		return store.money[denomination];
	};
};

const getChangeMoneyAction = (store: MoneyStore) => {
	return store.changeMoney;
};

export const selectors = {
	getMoney,
	getMoneyByDenomination,
	getChangeMoneyAction,
};
