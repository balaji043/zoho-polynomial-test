import { Data, Expression, PolynomialExpression, Power } from '.';
import { REGEX } from './constants';
import { Term } from './impl';

const testData = (data: Data): void => {
	console.log();
	console.log(`Input:           ${data.input}`);
	console.log(`Expected Output: ${data.expectedOutput}`);
	const actualOutput = solve(data.input);
	console.log(`Actual Output:   ${actualOutput}`);
	console.log(
		`Result:          ${data.expectedOutput === actualOutput ? 'pass' : 'Fail'}`
	);
	console.log();
};

export const solve = (input: string): string => {
	const polyExp: PolynomialExpression = parsePolynomialExpression(input);
	const exp: Expression = multiplyPolynomialExpression(polyExp);
	return createExpressionString(exp);
};

export const parsePolynomialExpression = (
	input: string
): PolynomialExpression => {
	let expressions: Expression[] = [];
	let keys = new Set<string>();
	const regExpression: string[] = input.split(REGEX.brackets);
	for (const exp of regExpression) {
		if (exp === '' || exp === '*') continue;
		const regTerms: RegExpMatchArray | null = exp.match(REGEX.expression);
		if (regTerms === null) continue;
		let terms: Term[] = [];
		for (let regTerm of regTerms) {
			let coeff: number = 1;
			let powerMap: Power = {};
			const regCoeff = regTerm.match(REGEX.coeff);
			if (regCoeff !== null) {
				const temp = regCoeff[0];
				if (temp === '-' || temp === '+') {
					if (temp === '-') coeff = -1;
				} else {
					coeff = parseInt(temp);
				}
				regTerm = regTerm.replace(REGEX.coeff, '');
			}
			let regPowerMap = regTerm.match(REGEX.powerArray);
			if (regPowerMap != null) {
				regPowerMap.forEach((powerTerm) => {
					const regPower = powerTerm.match(REGEX.power);
					let powerValue: number = 1;
					if (regPower !== null) {
						powerValue = getPower(regPower[0]);
						powerTerm = powerTerm.replace(REGEX.power, '1');
					}

					let keyValue: string = '';
					const regKey = powerTerm.match(REGEX.aplhabet);
					if (regKey !== null) {
						keyValue = regKey[0];
					}
					keys.add(keyValue);
					powerMap[keyValue] = powerValue;
				});
			}
			terms.push(new Term(coeff, powerMap));
		}

		expressions.push({ terms });
	}

	expressions.forEach((e) => {
		e.terms.forEach((t) => {
			t.keys = keys;
		});
	});
	return { expressions: expressions, keys: keys };
};

export const multiplyPolynomialExpression = (
	input: PolynomialExpression
): Expression => {
	return multiplyExpression(input.expressions[0], input.expressions[1]);
};

export const multiplyExpression = (
	exp1: Expression,
	exp2: Expression
): Expression => {
	const result: Term[] = [];
	for (let term1 of exp1.terms) {
		for (let term2 of exp2.terms) {
			const temp = term1.multiply(term2);
			if (result.length > 0) {
				let isAdded: boolean = false;
				for (let index = 0; index < result.length; index++) {
					const value = result[index];
					if (value.isAddable(temp)) {
						const addedTerm = value.add(temp);
						if (addedTerm != null) result[index] = addedTerm;
						isAdded = true;
					}
				}
				if (!isAdded) {
					result.push(temp);
				}
			} else {
				result.push(temp);
			}
		}
	}

	return { terms: result };
};

export const createExpressionString = (exp: Expression): string => {
	let result: string = '';
	exp.terms.forEach((term: Term) => {
		result += term.toString();
	});
	return result.startsWith('+') ? result.substring(1) : result;
};

const getPower = (value: string): number => {
	if (value !== '' && typeof value !== 'undefined') {
		const tempPower = value.replace('^', '');
		return parseInt(tempPower);
	}
	return 1;
};

export { testData, getPower };
