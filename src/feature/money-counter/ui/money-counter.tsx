import {
	DENOMINATIONS,
	type Denomination,
	INITIAL_MONEY,
	useMoneyStore,
} from "@/entity/money";
import { moneySelectors } from "@/entity/money/model/selectors";
import { Button } from "@/shared/ui/button";
import { type HTMLAttributes, type ReactNode, useState } from "react";
import { twJoin, twMerge } from "tailwind-merge";
import { useCounterStatusStore } from "../model/counter-status-store";
import {
	getGiveMoneyButtonVariant,
	getTakeMoneyButtonVariant,
} from "../model/get-toggle-counter-status-button-variant";
import { counterStatusSelectors } from "../model/selectors";
import type { ChangingMoneyState } from "../types";
import { Banknote } from "./banknote";
import { ChangeMoneyModal } from "./change-money-modal";
import { keys } from "@/shared/lib/keys";

type MoneyCounterProps = HTMLAttributes<HTMLElement> & {
	roundFinishButton: ReactNode;
	totalMoneyView: ReactNode;
};

export const MoneyCounter = ({
	roundFinishButton,
	totalMoneyView,
	className,
	...props
}: MoneyCounterProps) => {
	const counterStatus = useCounterStatusStore(
		counterStatusSelectors.getCounterStatus,
	);
	const setCounterStatus = useCounterStatusStore(
		counterStatusSelectors.getCounterStatusSetter,
	);

	const changeMoney = useMoneyStore(moneySelectors.getChangeMoneyAction);
	const money = useMoneyStore(moneySelectors.getMoney);

	const [isOpenChangeMoneyModal, setIsOpenChangeMoneyModal] = useState(false);

	const [changingMoneyState, setChangingMoneyState] =
		useState<ChangingMoneyState>({
			sum: DENOMINATIONS[0],
			changingDenomination: DENOMINATIONS[0],
			changingMoney: INITIAL_MONEY,
		});

	const handleBanknoteClick = (
		denomination: Denomination,
		specificMoney: number,
	) => {
		if (counterStatus === "increment") {
			return changeMoney(denomination, 1);
		}

		if (specificMoney > 0) {
			return changeMoney(denomination, -1);
		}
	};

	const handleModalChangeMoneyClick = () => {
		changeMoney(changingMoneyState.changingDenomination, -1);

		for (const denomination of keys<Denomination[]>(
			changingMoneyState.changingMoney,
		)) {
      const deltaAmount = changingMoneyState.changingMoney[denomination];
			changeMoney(denomination, deltaAmount);
		}
	};

	return (
		<article {...props} className={twMerge(className)}>
			<div>{roundFinishButton}</div>

			<div className="mt-5">{totalMoneyView}</div>

			<div className="mt-5 grid grid-cols-2 gap-1">
				<Button
					variant={getTakeMoneyButtonVariant(counterStatus)}
					onClick={() => setCounterStatus("increment")}
				>
					Получаю деньги
				</Button>
				<Button
					variant={getGiveMoneyButtonVariant(counterStatus)}
					onClick={() => setCounterStatus("decrement")}
				>
					Отдаю деньги
				</Button>
			</div>

			<ul className={twJoin("mt-5", "flex flex-wrap gap-4 justify-center")}>
				{DENOMINATIONS.map((denomination) => {
					const specificMoney = money[denomination];

					const handleLongPress = () => {
						setIsOpenChangeMoneyModal(true);
						setChangingMoneyState({
							sum: denomination,
							changingDenomination: denomination,
							changingMoney: INITIAL_MONEY,
						});
					};

					const handleClick = () => {
						handleBanknoteClick(denomination, specificMoney);
					};

					return (
						<li key={denomination}>
							<Banknote
								status={counterStatus}
								denomination={denomination}
								amountOfBanknotes={specificMoney}
								onLongPress={handleLongPress}
								onClick={handleClick}
							/>
						</li>
					);
				})}
			</ul>

			<ChangeMoneyModal
				open={isOpenChangeMoneyModal}
				onOpenChange={setIsOpenChangeMoneyModal}
				changingMoneyState={changingMoneyState}
				setChangingMoneyState={setChangingMoneyState}
				onChangeMoneyClick={handleModalChangeMoneyClick}
			/>
		</article>
	);
};
