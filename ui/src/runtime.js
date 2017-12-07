require("utils");
require("matrix");
require("colors");
require("shape");
require("block");
require("game_type");
require("game");
require("tetris");

let game = null;

function new_game() {
	game = new Game(simplest);
}

function game_to_html(game) {
	function cell_to_div(cell) {
		let cell_div = document.createElement("div");
		cell_div.className += " cell " + css_color(cell);
		return cell_div;
	}

	if (game === null) {
		let start_msg = document.createElement("h1");
		start_msg.innerHTML = "Press 's' to start";
		return start_msg;
	}

	else if (game.game_over) {
		let game_over_msg = document.createElement("h1");
		game_over_msg.innerHTML = "GAME OVER<br/>Score: " + game.score;
		return game_over_msg;
	}

	else {
		div_matrix = game.get_visible_with_block().map(cell_to_div);
		div_list = div_matrix.rows.map(
			row => {
				let row_div = document.createElement("div");
				row_div.className += " row";
				row.forEach(cell_div => {
					row_div.appendChild(cell_div);
				});
				return row_div;
			}
		);
		let board_div = document.createElement("div");
		board_div.className += " board";
		div_list.forEach(row_div => {
			board_div.appendChild(row_div);
		});
		return board_div;
	}
}

function checkKey(e) {

	console.log("KEYDOWN: ", e, window.event);

	e = e || window.event;

	if (e.keyCode === 38) {
		// up arrow
	}
	else if (e.keyCode === 40) {
		// down arrow
		game.down();
	}
	else if (e.keyCode === 37) {
		// left arrow
		game.left();
	}
	else if (e.keyCode === 39) {
		// right arrow
		game.right();
	}
	else if (e.keyCode === 68) {
		// d
		game.rot_ccw();
	}
	else if (e.keyCode === 70) {
		// f
		game.rot_cw();
	}
	else if (e.keyCode === 83) {
		// s
		new_game();
	}
	// Update game
	let game_div = document.getElementById("player_board");
	game_div.innerHTML = "";
	game_div.appendChild(game_to_html(game));
}

document.onkeydown = checkKey;

file_loaded("runtime");
