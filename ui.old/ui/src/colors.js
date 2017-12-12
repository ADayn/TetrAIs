require("utils");

function css_color(color) {
	if (color === Colors.CLEAR) return "clear";
	else if (color === Colors.BLACK) return "black";
	else if (color === Colors.RED) return "red";
	else if (color === Colors.YELLOW) return "yellow";
	else if (color === Colors.GREEN) return "green";
	else if (color === Colors.BLUE) return "blue";
	else if (color === Colors.PURPLE) return "purple";
	else if (color === Colors.ORANGE) return "orange";
	else assert(false, "Color not found", color);
}

const Colors = {
	CLEAR: 0,
	BLACK: 1,
	RED: 2,
	YELLOW: 3,
	GREEN: 4,
	BLUE: 5,
	PURPLE: 6,
	ORANGE: 7
};

const valid_colors = [
	Colors.RED,
	Colors.YELLOW,
	Colors.GREEN,
	Colors.BLUE,
	Colors.PURPLE,
	Colors.ORANGE
];

file_loaded("colors");
