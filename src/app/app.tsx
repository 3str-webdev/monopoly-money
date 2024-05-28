import { MoneyCounter } from "@/feature/money-counter";
import { RoundFinishButton } from "@/widgets/round-finish-button";
import { TotalMoneyView } from "@/widgets/total-money-view";
import { twJoin } from "tailwind-merge";

export const App = () => {
	return (
		<main className={twJoin("h-dvh w-full max-w-2xl", "mx-auto p-4")}>
			<h1 className="text-xl font-semibold">Monopoly Money</h1>

			<MoneyCounter
				className="mt-8"
				roundFinishButton={<RoundFinishButton className="w-full" />}
				totalMoneyView={<TotalMoneyView />}
			/>
		</main>
	);
};
