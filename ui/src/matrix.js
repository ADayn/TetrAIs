require("utils");

class Matrix {
	constructor(num_rows, num_cols, filler) {
		assert(num_rows >= 0);
		assert(num_cols >= 0);

		function make_list() {
			const l = [];
			l.length = num_cols;
			return l;
		}
		const rows = [];
		rows.length = num_rows;
		rows.map(_ => make_list);
		this.rows = rows.map(
			(row, row_idx) => row.map(
				(col, col_idx) => filler(row_idx, col_idx)
			)
		);
		this.num_rows = num_rows;
		this.num_cols = num_cols;
	}

	assert_in_bounds(row_idx, col_idx) {
		assert(row_idx === null || row_idx >= 0, "Row index must be positive", row_idx, this.num_rows);
		assert(row_idx === null || row_idx < this.num_rows, "Row index too high", row_idx, this.num_rows);
		assert(col_idx === null || col_idx >= 0, "Col index must be positive", col_idx, this.num_cols);
		assert(col_idx === null || col_idx < this.num_cols, "Col index too high", col_idx, this.num_cols);
	}

	get(row_idx, col_idx) {
		return this.rows[row_idx][col_idx]
	}

	/**
	 * Returns new matrix inclusive of *_begin and *_end
	 */
	slice(row_begin, col_begin, row_end, col_end) {
		this.assert_in_bounds(row_begin, col_begin);
		this.assert_in_bounds(row_end, col_end);
		assert(row_begin <= row_end);
		assert(col_begin <= col_end);
		return new Matrix(
			row_end - row_begin,
			col_end - col_begin,
			(row_idx, col_idx) =>
				this.get(row_idx + row_begin, col_idx + col_begin)
		)
	}

	/**
	 * Returns new matrix
	 */
	map(mapper) {
		return new Matrix(
			this.num_rows,
			this.num_cols,
			(row_idx, col_idx) => mapper(this.get(), row_idx, col_idx)
		)
	}

	/**
	 * creates an exact copy
	 */
	copy() {
		return this.map(id);
	}

	/**
	 * creates a new matrix with rows swapped
	 */
	swap(row_idx_1, row_idx_2) {
		this.assert_in_bounds(row_idx_1, null);
		this.assert_in_bounds(row_idx_2, null);
		const copy = this.copy();
		row_1 = copy.rows[row_idx_1];
		row_2 = copy.rows[row_idx_2];
		copy.rows[row_idx_1] = row_2;
		copy.rows[row_idx_2] = row_1;
		return copy;
	}

	or(other_matrix) {
		return this.map(
			(cell, row_idx, cell_idx) =>
				cell || other_matrix.get(row_idx, cell_idx)
		)
	}
}

file_loaded("matrix");
