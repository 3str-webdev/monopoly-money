import type { HTMLAttributes, ReactNode } from "react";
import { twJoin, twMerge } from "tailwind-merge";
import { Banknote } from "./banknote";
import { DENOMINATIONS } from "@/entity/money";
import { useCounterStatusStore } from "../model/counter-status-store";
import { selectors } from "../model/selectors";
import { Button } from "@/shared/ui/button";

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
	const counterStatus = useCounterStatusStore(selectors.getCounterStatus);
	const setCounterStatus = useCounterStatusStore(
		selectors.getCounterStatusSetter,
	);

	const takeMoneyButtonVariant =
		counterStatus === "increment" ? "default" : "outline";
	const giveMoneyButtonVariant =
		counterStatus === "decrement" ? "default" : "outline";

	return (
		<article {...props} className={twMerge(className)}>
			<div>{roundFinishButton}</div>

			<div className="mt-5">{totalMoneyView}</div>

			<div className="mt-5 grid grid-cols-2 gap-1">
				<Button
					variant={takeMoneyButtonVariant}
					onClick={() => setCounterStatus("increment")}
				>
					Получаю деньги
				</Button>
				<Button
					variant={giveMoneyButtonVariant}
					onClick={() => setCounterStatus("decrement")}
				>
					Отдаю деньги
				</Button>
			</div>

			<ul className={twJoin("mt-5", "flex flex-wrap gap-4 justify-center")}>
				{DENOMINATIONS.map((denomination) => {
					return (
						<li key={denomination}>
							<Banknote status={counterStatus} denomination={denomination} />
						</li>
					);
				})}
			</ul>
		</article>
	);
};
