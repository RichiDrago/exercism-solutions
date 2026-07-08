function collatzConjecture(number) {
  if (number <= 0) throw new Error("Only positive integers are allowed");

  if (number === 1) return 0;

  if (number % 2 === 0) return 1 + collatzConjecture(number / 2);
  else return 1 + collatzConjecture(number * 3 + 1);
}

export const steps = (number) => {
  return collatzConjecture(number);
};
