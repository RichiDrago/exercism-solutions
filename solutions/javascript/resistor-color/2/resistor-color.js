export const COLORS = [
  "black",
  "brown",
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "violet",
  "grey",
  "white",
];

/**
 *
 * @param {string} color
 * @returns
 */
export const colorCode = (color) => {
  return COLORS.indexOf(color.toLowerCase());
};
