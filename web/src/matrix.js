require("utils");

class Matrix {
	constructor(num_rows, num_cols, filler) {
		assert(num_rows >= 0);
		assert(num_cols >= 0);

		const rows = Array(num_rows).fill(undefined).map(_ => Array(num_cols).fill(undefined));
		this.rows = rows.map(
			(row, row_idx) => row.map(
				(_, col_idx) => filler(row_idx, col_idx)
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
		this.assert_in_bounds(row_idx, col_idx);
		return this.rows[row_idx][col_idx]
	}

	set(row_idx, col_idx, cell) {
		this.assert_in_bounds(row_idx, col_idx);
		this.rows[row_idx][col_idx] = cell
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
			row_end - row_begin + 1,
			col_end - col_begin + 1,
			(row_idx, col_idx) =>
				this.get(row_idx + row_begin, col_idx + col_begin)
		)
	}

	in_bounds(row_idx, col_idx) {
		return row_idx >= 0 && row_idx < this.num_rows && col_idx >= 0 && col_idx < this.num_cols;
	}

	replace(row_offset, col_offset, matrix) {
		this.assert_in_bounds(row_offset, col_offset);
		return this.map((cell, row_idx, col_idx) =>
				matrix.in_bounds(row_idx - row_offset, col_idx - col_offset)
					? matrix.get(row_idx - row_offset, col_idx - col_offset)
					: cell
		)
	}

	/**
	 * Returns new matrix
	 */
	map(mapper) {
		return new Matrix(
			this.num_rows,
			this.num_cols,
			(row_idx, col_idx) => mapper(this.get(row_idx, col_idx), row_idx, col_idx)
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
		const row_1 = copy.rows[row_idx_1];
		const row_2 = copy.rows[row_idx_2];
		copy.rows[row_idx_1] = row_2;
		copy.rows[row_idx_2] = row_1;
		return copy;
	}

	or(other_matrix) {
		return this.map(
			(cell, row_idx, cell_idx) =>
				cell || other_matrix.get(row_idx, cell_idx)
		);
	}

	and(other_matrix) {
		return this.map(
			(cell, row_idx, cell_idx) =>
				cell && other_matrix.get(row_idx, cell_idx)
		);
	}

	reduce(f, init) {
		let acc = init;
		for (let r = 0; r < this.num_rows; r ++) {
			for (let c = 0; c < this.num_cols; c++) {
				acc = f(acc, this.rows[r][c]);
			}
		}
		return acc;
	}

	fill_row(row_idx, fill) {
		this.assert_in_bounds(row_idx, null);
		return this.map(
			(cell, row_idx_old, col_idx_old) =>
				row_idx_old === row_idx ? fill
					                    : cell
		)
	}

	rot_cw() {
		return new Matrix(
			this.num_cols,
			this.num_rows,
			(row_idx, col_idx) => {
				return this.get(this.num_rows - 1 - col_idx, row_idx)
			}
		)
	}
}

file_loaded("matrix");
