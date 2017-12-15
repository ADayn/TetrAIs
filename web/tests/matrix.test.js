const Matrix = require("../src/matrix.js");

function from_2d_array(rows, cols, a) {
	if (a.length !== rows) {
		throw "malformed array: " + a.toString()
	}
	a.forEach(sub_a => {
		if (sub_a.length !== cols) {
			throw "malformed array: " + a.toString()
		}
	});
	return new Matrix(rows, cols, (row_idx, col_idx) => {
		return a[row_idx][col_idx];
	})
}

beforeEach(() => {
	console.error = () => {};
});

describe("Matrix", () => {
	// TODO

	describe("constructor", () => {

		test("should create a matrix", () => {
			const rows = [[1]];
			const matrix = from_2d_array(1, 1, rows);
			expect(matrix.rows).toEqual(rows);
			expect(matrix.num_rows).toEqual(1);
			expect(matrix.num_cols).toEqual(1);
		});

	});

	describe("assert_in_bounds", () => {

		test("shouldn't throw if the row, col are in bounds", () => {
			const rows = [[1]];
			const matrix = from_2d_array(1, 1, rows);
			expect(() => matrix.assert_in_bounds(0, 0)).not.toThrow();
		});

		test("should throw if the row isn't in bounds", () => {
			const rows = [[1]];
			const matrix = from_2d_array(1, 1, rows);
			expect(() => matrix.assert_in_bounds(1, 0)).toThrow();
		});

		test("should throw if the col isn't in bounds", () => {
			const rows = [[1]];
			const matrix = from_2d_array(1, 1, rows);
			expect(() => matrix.assert_in_bounds(0, 1)).toThrow();
		});

	});

	describe("get", () => {

		test("should return the given index", () => {
			const rows = [[1, 2]];
			const matrix = from_2d_array(1, 2, rows);
			expect(matrix.get(0, 1)).toBe(2);
		});

		test("should throw an exception if index is out of bounds (rows)", () => {
			const rows = [[1, 2]];
			const matrix = from_2d_array(1, 2, rows);
			expect(() => matrix.get(1, 1)).toThrow();
		});

		test("should throw an exception if index is out of bounds (cols)", () => {
			const rows = [[1, 2]];
			const matrix = from_2d_array(1, 2, rows);
			expect(() => matrix.get(0, 2)).toThrow();
		});

	});

	describe("set", () => {

		test("should set the given index to the given value", () => {
			const rows = [[1, 2]];
			const matrix = from_2d_array(1, 2, rows);
			matrix.set(0, 1, 3);
			expect(matrix.rows).toEqual([[1, 3]]);
		});

		test("should throw an exception if index is out of bounds (rows)", () => {
			const rows = [[1, 2]];
			const matrix = from_2d_array(1, 2, rows);
			expect(() => matrix.set(1, 1)).toThrow();
		});

		test("should throw an exception if index is out of bounds (cols)", () => {
			const rows = [[1, 2]];
			const matrix = from_2d_array(1, 2, rows);
			expect(() => matrix.set(0, 2)).toThrow();
		});

	});

	describe("slice", () => {

		test("should return a matrix of the given slice", () => {
			const rows = [[1, 2, 3],
			              [4, 5, 6],
			              [7, 8, 9]];
			const matrix = from_2d_array(3, 3, rows);
			expect(matrix.slice(0, 1, 2, 1).rows).toEqual([[2],[5],[8]]);
		});

	});

	describe("in_bounds", () => {

		test("should return true if it is in bounds", () => {
			const rows = [[1]];
			const matrix = from_2d_array(1, 1, rows);
			expect(matrix.in_bounds(0, 0)).toBe(true);
		});

		test("should return false if it is out of bounds (rows)", () => {
			const rows = [[1]];
			const matrix = from_2d_array(1, 1, rows);
			expect(matrix.in_bounds(1, 0)).toBe(false);
		});

		test("should return false if it is out of bounds (cols)", () => {
			const rows = [[1]];
			const matrix = from_2d_array(1, 1, rows);
			expect(matrix.in_bounds(0, 1)).toBe(false);
		});

	});

	describe("replace", () => {

		test("should replace the given indices and return a new matrix", () => {
			const rows1 = [
				[1, 2, 3],
				[4, 5, 6],
				[7, 8, 9]
			];
			const rows2 = [
				[1, 2, 3],
				[4, 0, 6],
				[7, 8, 9]
			];
			const rows_replace = [[0]];
			const matrix1 = from_2d_array(3, 3, rows1);
			const matrix_replace = from_2d_array(1, 1, rows_replace);
			expect(matrix1.replace(1, 1, matrix_replace).rows).toEqual(rows2);
			expect(matrix1.rows).toEqual(rows1);
		});

		test("should throw an exception if index is out of bounds (rows)", () => {
			const rows = [[1, 2]];
			const matrix = from_2d_array(1, 2, rows);
			expect(() => matrix.replace(1, 1, matrix)).toThrow();
		});

		test("should throw an exception if index is out of bounds (cols)", () => {
			const rows = [[1, 2]];
			const matrix = from_2d_array(1, 2, rows);
			expect(() => matrix.replace(0, 2, matrix)).toThrow();
		});

	});

	describe("map", () => {

		test("should replace all indices and return a new matrix", () => {
			const rows1 = [
				[1, 2, 3],
				[4, 5, 6],
				[7, 8, 9]
			];
			const rows2 = [
				[2, 3, 4 ],
				[5, 6, 7 ],
				[8, 9, 10]
			];
			const matrix = from_2d_array(3, 3, rows1);
			expect(matrix.map((old, r_i, c_i) => old + 1).rows).toEqual(rows2);
			expect(matrix.rows).toEqual(rows1);
		});

	});

	describe("copy", () => {

		test("should return a new matrix with the same rows", () => {
			const rows = [
				[1, 2, 3],
				[4, 5, 6],
				[7, 8, 9]
			];
			const matrix = from_2d_array(3, 3, rows);
			const matrix_copy = matrix.copy();
			expect(matrix.rows).toEqual(matrix_copy.rows);
			expect(matrix.rows).not.toBe(matrix_copy.rows);
		});

	});

	describe("swap", () => {

		test("should return a new matrix with the given rows swapped", () => {
			const rows = [
				[1, 2, 3],
				[4, 5, 6],
				[7, 8, 9]
			];
			const rows_swapped = [
				[7, 8, 9],
				[4, 5, 6],
				[1, 2, 3]
			];
			const matrix = from_2d_array(3, 3, rows);
			const matrix_swapped = matrix.swap(0, 2);
			expect(matrix.rows).toEqual(rows);
			expect(matrix_swapped.rows).toEqual(rows_swapped);
		});

	});

	describe("or", () => {

		test("should return a new matrix ored", () => {
			const rows1 = [
				[0, 0],
				[1, 1]
			];
			const rows2 = [
				[0, 1],
				[0, 1]
			];
			const matrix1 = from_2d_array(2, 2, rows1);
			const matrix2 = from_2d_array(2, 2, rows2);
			const matrix_or = matrix1.or(matrix2);
			expect(matrix_or.rows).toEqual([
				[0, 1],
				[1, 1]
			]);
		});

	});

	describe("and", () => {

		test("should return a new matrix anded", () => {
			const rows1 = [
				[0, 0],
				[1, 1]
			];
			const rows2 = [
				[0, 1],
				[0, 1]
			];
			const matrix1 = from_2d_array(2, 2, rows1);
			const matrix2 = from_2d_array(2, 2, rows2);
			const matrix_and = matrix1.and(matrix2);
			expect(matrix_and.rows).toEqual([
				[0, 0],
				[0, 1]
			]);
		});
	});

	describe("reduce", () => {

		test("should call the callback going through each column before moving on to each row",  () => {
			const rows = [
				[1, 2],
				[3, 4]
			];
			matrix = from_2d_array(2, 2, rows);
			expect(matrix.reduce((acc, cell) => acc.concat([cell]), [])).toEqual([1, 2, 3, 4]);
		});

	});

	describe("fill_row", () => {

		test("should call fill the given row with the filler",  () => {
			const rows = [
				[1, 2],
				[3, 4]
			];
			matrix = from_2d_array(2, 2, rows);
			expect(matrix.fill_row(1, 0).rows).toEqual([
				[1, 2],
				[0, 0]
			]);
		});

		test("should throw an exception if index is out of bounds (rows)", () => {
			const rows = [[1, 2]];
			const matrix = from_2d_array(1, 2, rows);
			expect(() => matrix.fill_row(1, 1)).toThrow();
		});

	});

	describe("rot_cw", () => {

		test("should rotate a square matrix", () => {
			const rows = [
				[1, 2],
				[3, 4]
			];
			matrix = from_2d_array(2, 2, rows);
			expect(matrix.rot_cw().rows).toEqual([
				[3, 1],
				[4, 2]
			]);
		});

		test("should rotate a non-square matrix", () => {
			const rows = [
				[1, 2]
			];
			matrix = from_2d_array(1, 2, rows);
			expect(matrix.rot_cw().rows).toEqual([
				[1],
				[2]
			]);
		});

	});

});
