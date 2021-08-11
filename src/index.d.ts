interface Data {
	input: string;
	expectedOutput: string;
}

type Power = { [x: string]: number };

interface ITerm {
	coefficient: number;
	power: Power;
	keys: Set<string>;
	multiply: (other: ITerm) => ITerm;
	add: (other: ITerm) => ITerm | null;
	isAddable: (other: ITerm) => boolean;
	toString: () => string;
}


interface Expression {
	terms: ITerm[];
}

interface PolynomialExpression {
	expressions: Expression[];
	keys: Set<string>;
}

export { Data, ITerm, Power, PolynomialExpression, Expression };
