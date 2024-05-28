import { DENOMINATIONS, type Denomination } from "@/entity/money";
import { Button } from "@/shared/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/shared/ui/dialog";
import type { DialogProps } from "@radix-ui/react-dialog";
import { twJoin } from "tailwind-merge";
import type { ChangingMoneyState } from "../types";
import { Banknote } from "./banknote";

type ChangeMoneyModalProps = DialogProps & {
	changingMoneyState: ChangingMoneyState;
	setChangingMoneyState: (state: ChangingMoneyState) => void;
	onChangeMoneyClick: () => void;
};

export const ChangeMoneyModal = ({
	changingMoneyState,
	setChangingMoneyState,
	onOpenChange,
	onChangeMoneyClick,
	...props
}: ChangeMoneyModalProps) => {
	const { sum, changingMoney, changingDenomination } = changingMoneyState;

	const isChangeMoneyButtonDisabled = sum !== 0;

	const handleBanknoteClick = (denomination: Denomination) => {
		const newSum = sum - denomination;
		const newChangingMoney = {
			...changingMoney,
			[denomination]: changingMoney[denomination] + 1,
		};

		setChangingMoneyState({
			sum: newSum,
			changingMoney: newChangingMoney,
			changingDenomination,
		});
	};

	const handleChangeClick = () => {
		if (onOpenChange) {
			onOpenChange(false);
		}

		onChangeMoneyClick();
	};

	return (
		<Dialog {...props} onOpenChange={onOpenChange}>
			<DialogContent
				className={twJoin("w-[95%]", "max-w-[400px]", "rounded-lg")}
			>
				<DialogHeader>
					<DialogTitle>Разменяем денюшки</DialogTitle>
				</DialogHeader>

				<div>
					<div className="text-[50px] text-center">{sum}</div>

					<ul className={twJoin("mt-3", "flex flex-wrap justify-center gap-3")}>
						{DENOMINATIONS.map((denomination) => {
							const isDisabled = denomination > sum;

							return (
								<li key={denomination}>
									<Banknote
										denomination={denomination}
										onClick={() => handleBanknoteClick(denomination)}
										amountOfBanknotes={changingMoney[denomination]}
										disabled={isDisabled}
									/>
								</li>
							);
						})}
					</ul>
				</div>

				<DialogFooter>
					<Button
						size={"lg"}
						onClick={handleChangeClick}
						disabled={isChangeMoneyButtonDisabled}
					>
						Разменять
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
