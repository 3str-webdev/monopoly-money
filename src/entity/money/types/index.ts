export type Denomination = 500 | 100 | 50 | 20 | 10 | 5 | 1;

export type Money = Record<Denomination, number>;
