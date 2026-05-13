/**
 *
 * @param {string} sentence
 */
export const isPangram = (sentence) => {
  const sentenceLetters = new Set(
    sentence
      .toLowerCase()
      .replaceAll(/[^a-z]/g, "")
      .split(""),
  );

  return sentenceLetters.size === 26;
};
