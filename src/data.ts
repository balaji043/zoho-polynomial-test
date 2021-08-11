import { Data } from ".";

const input1: Data = {
	input: '(2x+y)*(3x-5y)',
	expectedOutput: '6x^2-7xy-5y^2',
};
const input2: Data = {
	input: '(2xy+4x^2y)*(2x^2y+6xy)',
	expectedOutput: '28x^3y^2+12x^2y^2+8x^4y^2',
};
const input3: Data = {
	input: '(2x^2y+3xy^2z-xz^3)*(5xyz+3y^2z-2z)',
	expectedOutput:
		'10x^3y^2z+6x^2y^3z-4x^2yz+15x^2y^3z^2+9xy^4z^2-6xy^2z^2-5x^2yz^4-3xy^2z^4+2xz^4',
};
export { input1, input2, input3 };
