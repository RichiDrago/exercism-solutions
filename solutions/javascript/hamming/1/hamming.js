export const compute = (stringA, stringB) => {
  const { length } = stringA;
  if (length !== stringB.length)
    throw new Error("strands must be of equal length");

  let hammingDistance = 0;
  for (let i = 0; i < length; i++) {
    if (stringA[i] !== stringB[i]) hammingDistance++;
  }

  return hammingDistance;
};
