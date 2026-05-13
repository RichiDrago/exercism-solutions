/**
 *
 * @param {Date} date
 */
export const gigasecond = (date) => {
  const GIGASECOND_MS = 10 ** 9 * 1000;
  return new Date(date.getTime() + GIGASECOND_MS);
};
