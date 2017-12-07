require("utils");
require("matrix");
require("colors");
require("shape");
require("block");

class Game {
	constructor(type) {
		const board_height = type.height;
		const board_width = type.width;
		const shapes = type.shapes;

		assert(board_height > 0, "Board must be at least 1 block high");
		assert(board_width > 0, "Board must be at least 1 block wide");
		assert(shapes.length > 0, "At least one shape is needed to play");
		shapes.forEach((shape, idx) => {
			assert(shape.width < board_width, "No shapes can be wider than the board.", [idx, board_width])
		});

		// Extra space needed on top for placing the next falling shape out of view
		const top_extra = Math.max(shapes.map(shape => shape.height));
		// Extra space needed on each side so a shape can be up against the wall
		// without it's matrix (and thus, (x, y) location) passing out of bounds.
		const side_extra = Math.max(shapes.map(shape => shape.width));
		// 1 added to height for bottom boarder, so no pieces fall through
		// Doesn't need to be more since block matrices can be out of bounds
		// (because x, y start at upper left of block)
		const bottom_extra = 1;
		// Matrix of colors
		const board = new Matrix(
			board_height + top_extra + bottom_extra,
			// times 2 for 1 for each side
			board_width + side_extra * 2,
			(row_idx, col_idx) =>
				col_idx < side_extra                    || // left boarder
				col_idx >= board_width - side_extra     || // right boarder
				row_idx >= board_height - bottom_extra     // bottom boarder
					// Color boarders black, free space clear
					? Colors.BLACK
					: Colors.CLEAR
		);

		// Initialize fields
		this.score = 0;
		this.board = board;
		this.block = null;
		this.shapes = shapes;
		// N, E, S, W
		this.boarder = [top_extra, side_extra, bottom_extra, side_extra]
		this.width = board_width;
		this.height = board_height;
		this.game_over = false;
	}

	assert_game_running() {
		if (this.game_over) {
			throw "Unsupported when game is over";
		}
	}

	/**
	 * Responsible for turning this:
	 *
	 * |      |
	 * |[][][]| <-
	 * |  [][]|
	 * |[][][]| <-
	 * |  []  |
	 *
	 * into this:
	 *
	 * |      |
	 * |      | <-
	 * |  [][]|
	 * |      | <-
	 * |  []  |
	 *
	 * and updating scores
	 */
	clear_full_rows() {
		this.assert_game_running();
		const visible_rows = this.get_visible();
		streak = 0;
		visible_rows.forEach(row => {
			if (all(row)) { // Full, must be cleared
				row.forEach((v, idx) => {
					row[idx] = Colors.CLEAR;
				});
				streak += 1;
			}
			else {
				streak = 0;
			}
			if (streak) {
				self.score += 10 * Math.pow(3, streak);
			}
		});
	}

	/**
	 * Responsible for turning this:
	 *
	 * |      |
	 * |      |
	 * |  [][]|
	 * |      | <-
	 * |  []  |
	 *
	 * into this:
	 *
	 * |      |
	 * |      |
	 * |      |
	 * |  [][]|
	 * |  []  |
	 */


}

file_loaded("game");
