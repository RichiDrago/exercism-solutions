/**
 *
 * @param {number} rowsNumber
 */
export const rows = (rowsNumber) => {
  if (rowsNumber === 0) return [];

  const pascalsTriangle = [[1]];

  for (let i = 1; i < rowsNumber; i++) {
    const prevRow = pascalsTriangle[i - 1];
    const newRow = Array.from(
      { length: i + 1 },
      (_, y) => (prevRow[y - 1] ?? 0) + (prevRow[y] ?? 0),
    );
    pascalsTriangle.push(newRow);
  }

  return pascalsTriangle;
};
