// @ts-check
//
// The line above enables type checking for this file. Various IDEs interpret
// the @ts-check directive. It will give you helpful autocompletion when
// implementing this exercise.

/**
 * Determines whether or not you need a license to operate a certain kind of vehicle.
 *
 * @param {string} kind
 * @returns {boolean} whether a license is required
 */
export function needsLicense(kind) {
  const vehiclesRequiringLicense = ["car", "truck"];
  return vehiclesRequiringLicense.includes(kind.toLowerCase());
}

/**
 * Helps choosing between two options by recommending the one that
 * comes first in dictionary order.
 *
 * @param {string} option1
 * @param {string} option2
 * @returns {string} a sentence of advice which option to choose
 */
export function chooseVehicle(option1, option2) {
  let bestOption = option1 < option2 ? option1 : option2;
  return `${bestOption} is clearly the better choice.`;
}

/**
 * Calculates an estimate for the price of a used vehicle in the dealership
 * based on the original price and the age of the vehicle.
 *
 * @param {number} originalPrice
 * @param {number} age
 * @returns {number} expected resell price in the dealership
 */
export function calculateResellPrice(originalPrice, age) {
  let resellPrice;
  if (age < 3) {
    resellPrice = (originalPrice * 80) / 100; // 80%
  } else if (age <= 10) {
    resellPrice = (originalPrice * 70) / 100; // 70%
  } else {
    resellPrice = (originalPrice * 50) / 100; // 50%
  }
  return resellPrice;
}
