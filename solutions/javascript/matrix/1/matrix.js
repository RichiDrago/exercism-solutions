export class Matrix {
  /**
   *
   * @param {string} matrix
   */
  constructor(matrix) {
    this.rows_value = matrix
      .split("\n")
      .map((row) => row.split(" ").map(Number));
    this.columns_value = this.rows_value[0].map((_, i) =>
      this.rows_value.map((row) => row[i]),
    );
  }

  get rows() {
    return this.rows_value;
  }

  get columns() {
    return this.columns_value;
  }
}
