

imported = new Set();

function require(file_name) {
	// if (!imported.has(file_name)) throw file_name + " must be loaded first";
	return {};
}

function file_loaded(file_name) {
	imported.add(file_name);
	console.log("SCRIPT FILE LOADED: " + file_name);
}

let module = {};
