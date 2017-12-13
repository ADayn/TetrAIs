require("utils");
require("matrix");
require("colors");
require("shape");
require("block");
require("game_type");
require("game");

/**
 * points is a list of row, column pairs
 *
 * bmfp =bool_matrix_from_points
 */
function bmfp(num_rows, num_cols, points) {
	const m = new Matrix(num_rows, num_cols, () => false);
	points.forEach(point => {
		m.set(point.row, point.col, true);
	});
	return m;
}

const simplest = new GameType(
	[
		new Shape(
			// rot_0
			bmfp(3, 3, [p(0, 1), p(1, 0), p(1, 1), p(1, 2)])
		)
	],
	20,
	10
);

const tetris =  new GameType(
	[
		// I
		new Shape(bmfp(4, 4, [p(1, 0), p(1, 1), p(1, 2), p(1, 3)])),
		// O
		new Shape(bmfp(2, 2, [p(0, 0), p(0, 1), p(1, 0), p(1, 1)])),
		// T
		new Shape(bmfp(3, 3, [p(0, 0), p(0, 1), p(0, 2), p(1, 1)])),
		// J
		new Shape(bmfp(3, 3, [p(0, 0), p(0, 1), p(0, 2), p(1, 2)])),
		// L
		new Shape(bmfp(3, 3, [p(0, 0), p(0, 1), p(0, 2), p(1, 0)])),
		// S
		new Shape(bmfp(3, 3, [p(0, 1), p(0, 2), p(1, 0), p(1, 1)])),
		// Z
		new Shape(bmfp(3, 3, [p(0, 0), p(0, 1), p(1, 1), p(1, 2)])),

	],
	20,
	10
);

file_loaded("tetris");
