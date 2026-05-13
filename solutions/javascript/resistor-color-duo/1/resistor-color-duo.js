const BAND_COLORS = {
  black: 0,
  brown: 1,
  red: 2,
  orange: 3,
  yellow: 4,
  green: 5,
  blue: 6,
  violet: 7,
  grey: 8,
  white: 9,
};

/**
 *
 * @param  {string[]} colors
 */
export const decodedValue = (colors) => {
  if (colors.length < 2) throw new Error();

  const firstColor = colors[0],
    secondColor = colors[1];
  console.log(BAND_COLORS[firstColor], BAND_COLORS[secondColor]);
  return parseInt(`${BAND_COLORS[firstColor]}${BAND_COLORS[secondColor]}`);
};
