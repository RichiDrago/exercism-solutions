/**
 *
 * @param {string} rnaSequence
 */
export const toRna = (rnaSequence) => {
  const translation = {
    G: "C",
    C: "G",
    T: "A",
    A: "U",
  };

  return rnaSequence
    .split("")
    .map((c) => translation[c])
    .join("");
};
