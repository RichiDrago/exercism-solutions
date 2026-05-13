// @ts-check

/**
 *
 * @param {number[]} arr
 * @returns {number}
 */
function arrayToNumber(arr) {
  return Number(String(arr).replaceAll(",", ""));
}

/**
 * Calculates the sum of the two input arrays.
 *
 * @param {number[]} array1
 * @param {number[]} array2
 * @returns {number} sum of the two arrays
 */
export function twoSum(array1, array2) {
  return arrayToNumber(array1) + arrayToNumber(array2);
}

12;
21;

/**
 * Checks whether a number is a palindrome.
 *
 * @param {number} value
 * @returns {boolean} whether the number is a palindrome or not
 */
export function luckyNumber(value) {
  const str = String(value);
  return str === str.split("").reverse().join("");
}

/**
 * Determines the error message that should be shown to the user
 * for the given input value.
 *
 * @param {string|null|undefined} input
 * @returns {string} error message
 */
export function errorMessage(input) {
  if (!input) return "Required field";

  if (Number.isNaN(Number(input)) || input === "0") {
    return "Must be a number besides 0";
  } else {
    return "";
  }
}
