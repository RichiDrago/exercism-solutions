const WORD = /[\p{L}\p{N}]+(?:'[\p{L}\p{N}]+)*/gu;

/**
 *
 * @param {string} sentence
 */
export const countWords = (sentence) => {
  const counts = {};
  const words = sentence.toLowerCase().match(WORD) || [];

  for (const word of words) {
    counts[word] = (counts[word] || 0) + 1;
  }

  return counts;
};
