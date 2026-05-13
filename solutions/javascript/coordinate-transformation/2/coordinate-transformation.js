// @ts-check

/**
 * Create a function that returns a function making use of a closure to
 * perform a repeatable 2d translation of a coordinate pair.
 *
 * @param {number} dx the translate x component
 * @param {number} dy the translate y component
 *
 * @returns {function} a function which takes an x, y parameter, returns the
 *  translated coordinate pair in the form [x, y]
 */
export function translate2d(dx, dy) {
  const deltaX = dx;
  const deltaY = dy;

  /**
   * Translates a point by the given offsets.
   *
   * @param {number} x - The original x coordinate.
   * @param {number} y - The original y coordinate.
   * @returns {number[]} The translated coordinates as [newX, newY].
   */
  return function moveCoordinatesRight2Px(x, y) {
    return [x + deltaX, y + deltaY];
  };
}

/**
 * Create a function that returns a function making use of a closure to
 * perform a repeatable 2d scale of a coordinate pair.
 *
 * @param {number} sx the amount to scale the x component
 * @param {number} sy the amount to scale the y component
 *
 * @returns {function} a function which takes an x, y parameter, returns the
 *  scaled coordinate pair in the form [x, y]
 */
export function scale2d(sx, sy) {
  const scalingFactorX = sx;
  const scalingFactorY = sy;

  /**
   * Scales a 2D coordinate using a closure.
   *
   * @param {number} x - The original x coordinate.
   * @param {number} y - The original y coordinate.
   * @returns {number[]} The scaled coordinates as [newX, newY].
   */
  return function doubleScale(x, y) {
    return [x * scalingFactorX, y * scalingFactorY];
  };
}

/**
 * Create a composition function that returns a function that combines two
 * functions to perform a repeatable transformation
 *
 * @param {function} f the first function to apply
 * @param {function} g the second function to apply
 *
 * @returns {function} a function which takes an x, y parameter, returns the
 *  transformed coordinate pair in the form [x, y]
 */
export function composeTransform(f, g) {
  /**
   * Composes two transformation functions into a single transformation.
   *
   * @param {number} x - The original x coordinate.
   * @param {number} y - The original y coordinate.
   * @returns {number[]} The final transformed coordinates as [x, y].
   */
  return function composedTransform(x, y) {
    const [intermediateX, intermediateY] = f(x, y);
    return g(intermediateX, intermediateY);
  };
}

/**
 * Return a function that memoizes the last result.  If the arguments are the same as the last call,
 * then memoized result returned.
 *
 * @param {function} f the transformation function to memoize, assumes takes two arguments 'x' and 'y'
 *
 * @returns {function} a function which takes x and y arguments, and will either return the saved result
 *  if the arguments are the same on subsequent calls, or compute a new result if they are different.
 */
export function memoizeTransform(f) {
  /** @type {number | undefined} */
  let lastX;
  /** @type {number | undefined} */
  let lastY;
  /** @type {number[]} */
  let lastResult = [];

  /**
   * Returns a memoized version of the given function.
   * Only the last set of arguments and its result are stored.
   *
   * If the function is called again with the same arguments,
   * the cached result is returned instead of recomputing.
   * @param {number} x - The x coordinate.
   * @param {number} y - The y coordinate.
   * @returns {number[]} The transformed coordinates as [x, y].
   */
  return function memoizedScale(x, y) {
    if (lastX === x && lastY === y) return lastResult;
    lastX = x;
    lastY = y;
    return (lastResult = f(x, y));
  };
}
