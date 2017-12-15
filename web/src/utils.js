
// WTF Javascript???
function mod(numerator, denomenator) {
	return ((numerator % denomenator) + denomenator) % denomenator;
}

function max(l) {
	return Math.max(...l)
}


// Correctness

function assert(condition, message = "Assertion failed", objs = []) {
	if (!condition) {
		if (objs && objs !== []) console.error("Also logged with failed assertion: ", objs);
		throw message;
	}
}


// Usefull

function id(x) {
	return x;
}

class Pair {
	constructor(first, second) {
		this.first = first;
		this.second = second;
		// To act as location
		this.row = first;
		this.col = second;
	}
}

function p(fst, snd) {
	return new Pair(fst, snd);
}

function all(collection, to_bool = (x) => !!x) {
	return collection.reduce((acc, x) => acc && to_bool(x), true);
}

function any(collection, to_bool = (x) => !!x) {
	return collection.reduce((acc, x) => acc || to_bool(x), false);
}

// function flatMap(xs, f) {
// 	return xs.reduce((acc, x) =>
// 		acc.concat(f(x)), []);
// }

function pick_random(array) {
	return array[Math.floor(Math.random() * array.length)];
}

// Integer division
function idiv(numerator, denomenator) {
	return Math.floor(numerator / denomenator);
}

module.exports = {
	assert: assert,
	id: id
};
