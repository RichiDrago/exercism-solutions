const convertDecimalToBinaryRec = (decimalNumber) => {
  if (decimalNumber === 0) return "";
  if (decimalNumber === 1) return "1";

  return (
    convertDecimalToBinaryRec(Math.floor(decimalNumber / 2)) +
    `${decimalNumber % 2}`
  );
};

export const commands = (number) => {
  let actions = [];
  const binaryNumber = convertDecimalToBinaryRec(number).padStart(5, "0");
  if (binaryNumber[4] === "1") actions.push("wink");
  if (binaryNumber[3] === "1") actions.push("double blink");
  if (binaryNumber[2] === "1") actions.push("close your eyes");
  if (binaryNumber[1] === "1") actions.push("jump");
  if (binaryNumber[0] === "1") actions.reverse();
  return actions;
};
