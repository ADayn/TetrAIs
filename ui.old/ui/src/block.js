require("utils");
require("shape");
require("colors");

class Block {
	constructor(shape, color, rot = 0, row_idx = 0, col_idx = 0) {
		this.shape = shape;
		this.color = color;
		this.rot = rot;
		this.row_idx = row_idx;
		this.col_idx = col_idx;
		this.width = shape.width;
		this.height = shape.height;
	}

	matrix() {
		return this.shape.rots[this.rot].map(cell => cell ? this.color
			                                              : Colors.CLEAR);
	}

	map_rot(mapper) {
		return new Block(
			this.shape,
			this.color,
			mapper(this.rot),
			this.row_idx,
			this.col_idx
		)
	}

	map_loc(mapper) {
		const rowcol = mapper(this.row_idx, this.col_idx);
		return new Block(
			this.shape,
			this.color,
			this.rot,
			rowcol.row,
			rowcol.col
		)
	}

	rot_cw() {
		return this.map_rot(rot => mod(rot + 1, 4));
	}

	rot_ccw() {
		return this.map_rot(rot => mod(rot - 1, 4));
	}

	down() {
		return this.map_loc((r, c) => new Pair(r + 1, c));
	}

	left() {
		return this.map_loc((r, c) => new Pair(r, c - 1));
	}

	right() {
		return this.map_loc((r, c) => new Pair(r, c + 1));
	}
}

file_loaded("block");
