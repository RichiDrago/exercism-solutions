const OPERATORS = {
  plus: "+",
  minus: "-",
  multiplied: "*",
  divided: "/",
};

const OPERATIONS = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "*": (a, b) => a * b,
  "/": (a, b) => a / b,
};

export const answer = (text) => {
  const numberReg = /-?\d+(\.\d+)?/;
  const operatorReg = /\b(plus|minus|multiplied|divided)\b/;

  if (!text.toLowerCase().startsWith("what is")) {
    throw new Error("Unknown operation");
  }

  const cleaned = text
    .replace(/what is/i, "")
    .replaceAll("?", "")
    .replaceAll(" by", "")
    .trim();

  if (cleaned === "") throw new Error("Syntax error");

  const tokenReg = /-?\d+(\.\d+)?|\b(plus|minus|multiplied|divided)\b/g;
  const tokens = cleaned.match(tokenReg) ?? [];

  const unknownWords = cleaned
    .split(" ")
    .filter((el) => el !== "")
    .filter((el) => !numberReg.test(el) && !operatorReg.test(el));

  if (unknownWords.length > 0) throw new Error("Unknown operation");

  if (tokens.length === 0) throw new Error("Syntax error");

  const expression = tokens.map((el) =>
    operatorReg.test(el) ? OPERATORS[el] : el,
  );

  if (isNaN(parseFloat(expression[0]))) throw new Error("Syntax error");

  if (expression.length % 2 === 0) throw new Error("Syntax error");

  let result = parseFloat(expression[0]);

  for (let i = 1; i < expression.length; i += 2) {
    const op = expression[i];
    const num = parseFloat(expression[i + 1]);

    if (!OPERATIONS[op]) throw new Error("Syntax error");
    if (isNaN(num)) throw new Error("Syntax error");

    result = OPERATIONS[op](result, num);
  }

  return result;
};
