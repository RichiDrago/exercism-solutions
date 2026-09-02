/**
 *
 * @param {Record<string, string[]>} oldMap
 * @returns {Record<string, number>}
 */
export const transform = (oldMap) => {
  let newMap = Object.fromEntries(
    Object.entries(oldMap).flatMap(([point, letters]) =>
      letters.map((letter) => [letter.toLowerCase(), Number(point)]),
    ),
  );

  return newMap;
};
