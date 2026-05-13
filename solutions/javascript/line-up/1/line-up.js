/**
 * Formats a player's name and number for display.
 * @param {string} name - The player's name.
 * @param {number} number - The player's number.
 */
export const format = (name, number) => {
  const lastTwo = number % 100;
  const lastOne = number % 10;

  let suffix;
  if (lastTwo >= 11 && lastTwo <= 13) {
    suffix = "th";
  } else if (lastOne === 1) {
    suffix = "st";
  } else if (lastOne === 2) {
    suffix = "nd";
  } else if (lastOne === 3) {
    suffix = "rd";
  } else {
    suffix = "th";
  }

  return `${name}, you are the ${number}${suffix} customer we serve today. Thank you!`;
};
