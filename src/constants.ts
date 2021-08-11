const REGEX = {
	brackets: /\(|\)/gm,
	expression: /(\+|\-)?[a-z0-9.^]+/gi,
	powerArray: /([a-zA-Z]\^\d*)|([a-zA-Z])/gs,
	power: /\^\d*/gs,

	aplhabet: /[a-zA-Z]/,
	coeff: /[+|-]?\d*/s,
};

export { REGEX };
