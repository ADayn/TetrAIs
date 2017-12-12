require("utils");
require("matrix");

class Shape {
	constructor(rot_0, rot_90, rot_180, rot_270) {
		this.rots = [
			rot_0,
			rot_90,
			rot_180,
			rot_270
		];
		this.width = rot_0.num_cols;
		this.height = rot_0.num_rows;
	}
}

file_loaded("shape");