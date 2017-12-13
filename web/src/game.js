require("utils");
require("matrix");
require("colors");
require("shape");
require("block");
require("game_type");

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
		const top_extra = max(shapes.map(shape => shape.height));
		// Extra space needed on each side so a shape can be up against the wall
		// without it's matrix (and thus, (x, y) location) passing out of bounds.
		const side_extra = max(shapes.map(shape => shape.width));
		const bottom_extra = top_extra;
		// Matrix of colors
		const true_width = board_width + side_extra * 2;
		const true_height = board_height + top_extra + bottom_extra;
		const board = new Matrix(
			true_height,
			// times 2 for 1 for each side
			true_width,
			(row_idx, col_idx) =>
				col_idx < side_extra                  || // left boarder
				col_idx >= true_width - side_extra    || // right boarder
				row_idx >= true_height - bottom_extra    // bottom boarder
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
		this.e_vis_bound = true_width - side_extra - 1;
		this.s_vis_bound = true_height - bottom_extra - 1;
		this.w_vis_bound = side_extra;
		this.width = true_width;
		this.height = true_height;
		this.game_over = false;

		this.gen_block();
	}

	assert_game_running() {
		if (this.game_over) {
			throw "Unsupported when game is over";
		}
	}

	get_visible() {
		return this.board.slice(
			this.n_vis_bound,
			this.w_vis_bound,
			this.s_vis_bound,
			this.e_vis_bound
		)
	}

	get_visible_with_block() {
		const only_block =
			(new Matrix(this.height, this.width, () => Colors.CLEAR))
				.replace(this.block.row_idx, this.block.col_idx, this.block.matrix());
		return this.board.or(only_block).slice(
			this.n_vis_bound,
			this.w_vis_bound,
			this.s_vis_bound,
			this.e_vis_bound
		);
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
		let dropped = 0;
		let visible = this.get_visible();
		let rows = visible.copy().rows;
		for (let idx = rows.length - 1; idx >= 0; idx--) {
			let streak = 0;
			while (idx - dropped >= 0 && all(rows[idx - dropped])) {
				dropped += 1;
				streak += 1;
			}
			if (idx - dropped < 0) {
				visible = visible.fill_row(idx, Colors.CLEAR);
			}
			else {
				visible = visible.swap(idx, idx - dropped);
			}
			if (streak) {
				this.score += 10 * Math.pow(3, streak);
			}
		}
		// Refresh the viewable board
		this.board = this.board.replace(this.n_vis_bound, this.w_vis_bound, visible)
	}

	gen_block() {
		this.assert_game_running();
		if (this.block !== null) {
			throw "Cannot generate two blocks before the last has been stamped";
		}
		const e = this.boarder[1];
		const next_shape = pick_random(this.shapes);
		const next_color = pick_random(valid_colors);
		const init_row_idx = 0;
		const init_col_idx = idiv(this.width, 2) - idiv(next_shape.width, 2);
		this.block = new Block(next_shape, next_color, 0, init_row_idx, init_col_idx);
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
		const row_idx_1 = new_block.row_idx;
		const col_idx_1 = new_block.col_idx;
		const row_idx_2 = row_idx_1 + new_block.height - 1;
		const col_idx_2 = col_idx_1 + new_block.width - 1;
		const overlapping_new = this.board.slice(row_idx_1, col_idx_1, row_idx_2, col_idx_2);
		assert(overlapping_new.num_cols === new_block.width);
		assert(overlapping_new.num_rows === new_block.height);
		if (!any(overlapping_new.and(new_block.matrix()))) {
			this.block = new_block;
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
			const only_block =
				(new Matrix(this.height, this.width, () => Colors.CLEAR))
					.replace(this.block.row_idx, this.block.col_idx, this.block.matrix());
			this.board = this.board.or(only_block);
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
