function assert(condition, message = "Assertion failed") {
	if (!condition) {
		throw message;
	}
}

imported = new Set();

function require(file_name) {
	if (!(file_name in imported)) throw file_name + " must be loaded first"
}

function file_loaded(file_name) {
	imported.add(file_name);
}

function id(x) {
	return x;
}

class Pair {
	constructor(first, second) {
		this.first = first;
		this.second = second;
	}
}
