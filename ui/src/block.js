require("shape");

class Block {
	constructor(shape, rot = 0, x = 0, y = 0) {
		this.shape = shape;
		this.rot = rot;
		this.x = x;
		this.y = y;
		this.width = shape.width;
		this.height = shape.height;
	}
}

file_loaded("block");