export const commands = (number) => {
  const ACTIONS = ["wink", "double blink", "close your eyes", "jump"];

  const actions = ACTIONS.filter((_, i) => number & (1 << i));

  return number & 0b10000 ? actions.reverse() : actions;
};
