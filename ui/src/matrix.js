class Matrix {
	constructor(num_rows, num_cols, filler) {
		assert(num_rows >= 0);
		assert(num_cols >= 0);

		function make_list() {
			l = [];
			l.length = num_cols;
			return l;
		}
		const arr = [];
		arr.length = num_rows;
		arr.map(_ => make_list);
		this.arr = arr.map(
			(row, row_idx) => row.map(
				(col, col_idx) => filler(row_idx, col_idx)
			)
		);
		this.num_rows = num_rows;
		this.num_cols = num_cols;
	}

	get(row_idx, col_idx) {
		return this.arr[row_idx][col_idx]
	}

	/**
	 * Returns new matrix inclusive of *_begin and *_end
	 */
	slice(row_begin, col_begin, row_end, col_end) {
		assert(row_begin <= row_end);
		assert(col_begin <= col_end);
		return Matrix(
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
		return Matrix(
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
		assert(row_idx_1 < this.num_rows);
		assert(row_idx_2 < this.num_rows);
		const copy = this.copy();
		row_1 = copy.arr[row_idx_1];
		row_2 = copy.arr[row_idx_2];
		copy.arr[row_idx_1] = row_2;
		copy.arr[row_idx_2] = row_1;
		return copy;
	}
}

file_loaded("matrix");
