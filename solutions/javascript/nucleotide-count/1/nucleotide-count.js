/**
 *
 * @param {string} strand
 */
export function countNucleotides(strand) {
  const counts = { A: 0, C: 0, G: 0, T: 0 };

  for (const n of strand) {
    if (!(n in counts)) throw new Error("Invalid nucleotide in strand");
    counts[n] += 1;
  }

  return `${counts.A} ${counts.C} ${counts.G} ${counts.T}`;
}
