import type { EventHandler, MouseEvent } from "react";

export const enrichmentClickHandler = <T extends HTMLElement>(
	cb: EventHandler<MouseEvent<T>>,
	nativeOnClick?: EventHandler<MouseEvent<T>>,
) => {
	return (e: MouseEvent<T>) => {
		if (nativeOnClick) {
			nativeOnClick(e);
		}

		cb(e);
	};
};
