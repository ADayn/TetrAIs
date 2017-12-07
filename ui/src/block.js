require("utils");
require("shape");
require("colors");

class Block {
	constructor(shape, color, rot = 0, x = 0, y = 0) {
		this.shape = shape;
		this.color = color;
		this.rot = rot;
		this.x = x;
		this.y = y;
		this.width = shape.width;
		this.height = shape.height;
	}

	matrix() {
		return this.shape.rots[this.rot];
	}

	map_rot(mapper) {
		return new Block(
			this.shape,
			this.color,
			mapper(this.rot),
			this.x,
			this.y
		)
	}

	map_loc(mapper) {
		xy = mapper(this.x, this.y);
		return new Block(
			this.shape,
			this.color,
			this.rot,
			xy.first,
			xy.second
		)
	}

	rot_cw() {
		return this.map_rot(rot => (rot + 1) % 4);
	}

	rot_ccw() {
		return this.map_rot(rot => (rot - 1) % 4);
	}

	down() {
		this.map_loc((x, y) => new Pair(x, y + 1));
	}

	left() {
		this.map_loc((x, y) => new Pair(x - 1, y));
	}

	right() {
		this.map_loc((x, y) => new Pair(x + 1, y));
	}
}

file_loaded("block");
