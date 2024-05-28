export const keys = <T = unknown[]>(obj: object): T => {
	return Object.keys(obj) as unknown as T;
};
