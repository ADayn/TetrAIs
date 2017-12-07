// Correctness

function assert(condition, message = "Assertion failed", objs = []) {
	if (!condition) {
		if (objs) console.error("Also logged with failed assertion: ", objs);
		throw message;
	}
}

imported = new Set();

function require(file_name) {
	if (!imported.has(file_name)) throw file_name + " must be loaded first";
}

function file_loaded(file_name) {
	imported.add(file_name);
	console.log("SCRIPT FILE LOADED: " + file_name);
}


// Usefull

function id(x) {
	return x;
}

class Pair {
	constructor(first, second) {
		this.first = first;
		this.second = second;
	}
}

function all(collection, to_bool = (x) => !!x) {
	return collection.reduce((acc, x) => acc && to_bool(x), true);
}

function flatMap(xs, f) {
	xs.reduce((acc, x) =>
		acc.concat(f(x)), []);
}


file_loaded("utils");
