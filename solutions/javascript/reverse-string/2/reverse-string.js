/**
 * @param {string} string
 * @returns {string}
 */
export const reverseString = (string) => {
  const segmenter = new Intl.Segmenter();
  return [...segmenter.segment(string)]
    .map((s) => s.segment)
    .reverse()
    .join("");
};
