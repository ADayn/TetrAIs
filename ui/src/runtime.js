require("utils");
require("matrix");
require("colors");
require("shape");
require("block");
require("game_type");
require("game");
require("tetris");

document.onkeydown = checkKey;

function checkKey(e) {

	console.log("KEYDOWN: ", e, window.event);

	e = e || window.event;

	if (e.keyCode == '38') {
		// up arrow
	}
	else if (e.keyCode == '40') {
		// down arrow
	}
	else if (e.keyCode == '37') {
		// left arrow
	}
	else if (e.keyCode == '39') {
		// right arrow
	}

}

file_loaded("runtime");
