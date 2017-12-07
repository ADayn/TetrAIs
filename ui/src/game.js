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
		this.boarder = [top_extra, side_extra, bottom_extra, side_extra];
		this.n_vis_bound = top_extra;
		this.e_vis_bound = board_width - side_extra - 1;
		this.s_vis_bound = board_height - bottom_extra - 1;
		this.w_vis_bound = side_extra;
		this.width = board_width;
		this.height = board_height;
		this.game_over = false;

		this.gen_block();
	}

	assert_game_running() {
		if (this.game_over) {
			throw "Unsupported when game is over";
		}
	}

	get_visible() {
		return  this.board.slice(
			this.n_vis_bound,
			this.w_vis_bound,
			this.s_vis_bound,
			this.e_vis_bound
		)
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
	 * |      |
	 * |      |
	 * |  [][]|
	 * |  []  |
	 *
	 * and updating scores
	 */
	drop_rows() {
		this.assert_game_running();
		dropped = 0;
		let visible = this.get_visible();
		let rows = visible.copy().rows;
		for (let idx = rows.length - 1; idx >= 0; idx++) {
			let streak = 0;
			while (idx - dropped >= 0 && all(rows[idx - dropped])) {
				dropped += 1;
				streak += 1;
			}
			if (idx - dropped < 0) {
				visible = visible.fill_row(idx, Colors.CLEAR);
			}
			else {
				visible = visible.swap(idx, idx + dropped);
			}
			if (streak) {
				self.score += 10 * Math.pow(3, streak);
			}
		}
		this.board = this.board.replace(this.n_vis_bound, this.w_vis_bound, visible)
	}

	gen_block() {
		this.assert_game_running();
		if (this.block === null) {
			throw "Cannot generate two blocks before the last has been stamped";
		}
		const e = this.boarder[1];
		const next_shape = pick_random(this.shapes);
		const next_color = pick_random(valid_colors);
		const init_x = e + idiv(this.width, 2) - idiv(next_shape.width, 2);
		const init_y = 0;
		this.block = new Block(next_shape, next_color, 0, init_x, init_y);
	}

	get_staging() {
		return this.board.slice(
			0,
			this.w_vis_bound,
			this.n_vis_bound - 1,
			this.e_vis_bound
		)
	}

	translate(new_block) {
		this.assert_game_running();
		const y1 = new_block.y;
		const x1 = new_block.x;
		const y2 = y1 + new_block.height - 1;
		const x2 = x1 + new_block.width - 1;
		const overlapping_new = this.board.slice(y1, x1, y2, x2);
		assert(overlapping_new.cols === new_block.width);
		assert(overlapping_new.rows === new_block.height);
		if (!any(overlapping_new.and(new_block.matrix()))) {
			self.block = new_block;
			return true;
		}
		else {
			return false;
		}
	}

	down() {
		if (!this.translate(this.block.down())) {
			// Collision, need to stamp current block into board and generate new
            // one, or end game if stamped block enters staging area
			this.board = this.board.replace(this.block.y, this.block.x, this.block.matrix())
			this.block = null;
			this.drop_rows();
			if (any(this.get_staging())) {
				this.game_over = true;
			}
			else {
				this.gen_block();
			}
		}
	}

	left() {
		this.translate(this.block.left());
	}

	right() {
		this.translate(this.block.right());
	}

	rot_cw() {
		this.translate(this.block.rot_cw());
	}

	rot_ccw() {
		this.translate(this.block.rot_ccw());
	}
}

file_loaded("game");
