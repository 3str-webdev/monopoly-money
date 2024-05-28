import { twMerge } from "tailwind-merge";
import { Badge } from "./badge";
import { Button, type ButtonProps } from "./button";

export type MoneyChangeButtonProps = ButtonProps & {
	label: string;
};

export const MoneyChangeButton = ({
	label,
	children,
	className,
	...props
}: MoneyChangeButtonProps) => {
	return (
		<Button {...props} className={twMerge("relative", className)}>
			<Badge className="absolute -top-1/3 right-2">{label}</Badge>
			{children}
		</Button>
	);
};
