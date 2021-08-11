import { ITerm, Power } from '.';

class Term implements ITerm {
	coefficient: number;
	power: Power;
	keys: Set<string>;
	constructor(coefficient: number, power: Power) {
		this.coefficient = coefficient;
		this.power = power;
		this.keys = new Set<string>();
	}

	multiply = (other: Term): Term => {
		const power: Power = {};
		for (const pow of this.keys) {
			let pow1 = this.power[pow];
			let pow2 = other.power[pow];
			if (pow1 === NaN || typeof pow1 === 'undefined') {
				pow1 = 0;
			} else if (pow2 === NaN || typeof pow2 === 'undefined') {
				pow2 = 0;
			}
			power[pow] = pow1 + pow2;
		}

		const coefficient: number = this.coefficient * other.coefficient;
		const term = new Term(coefficient, power);
		term.keys = this.keys;
		return term;
	};

	add = (other: Term): Term | null => {
		if (this.isAddable(other)) {
			const term = new Term(this.coefficient + other.coefficient, this.power);
			term.keys = this.keys;
			return term;
		}
		return null;
	};
	isAddable = (other: Term): boolean => {
		for (const pow of this.keys) {
			let pow1 = this.power[pow];
			let pow2 = other.power[pow];
			if (pow1 === NaN || typeof pow1 === 'undefined') {
				pow1 = 0;
			} else if (pow2 === NaN || typeof pow2 === 'undefined') {
				pow2 = 0;
			}
			if (pow1 !== pow2) {
				return false;
			}
		}
		return true;
	};
	toString = (): string => {
		let str: string = '';
		for (const pow of this.keys) {
			const powerValue = this.power[pow];
			if (powerValue == 1) {
				str += `${pow}`;
			} else if (powerValue > 1) {
				str += `${pow}^${powerValue}`;
			}
		}

		let symbol = this.coefficient < 0 ? '' : '+';

		return `${symbol}${this.coefficient}${str}`;
	};
}
export { Term };
