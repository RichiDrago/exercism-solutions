// @ts-check

/**
 * Determines how long it takes to prepare a certain juice.
 *
 * @param {string} name
 * @returns {number} time in minutes
 */
export function timeToMixJuice(name) {
  switch (name) {
    case "Pure Strawberry Joy":
      return 0.5;
    case "Energizer":
    case "Green Garden":
      return 1.5;
    case "Tropical Island":
      return 3;
    case "All or Nothing":
      return 5;
    default:
      return 2.5;
  }
}

/**
 * Calculates the number of limes that need to be cut
 * to reach a certain supply.
 *
 * @param {number} wedgesNeeded
 * @param {string[]} limes
 * @returns {number} number of limes cut
 */
export function limesToCut(wedgesNeeded, limes) {
  let slicedLimeWedges = 0;
  let slicedLimes = 0;
  while (slicedLimeWedges < wedgesNeeded && slicedLimes < limes.length) {
    const lime = limes[slicedLimes];
    switch (lime) {
      case "small":
        slicedLimeWedges += 6;
        break;
      case "medium":
        slicedLimeWedges += 8;
        break;
      case "large":
        slicedLimeWedges += 10;
        break;
    }

    slicedLimes++;
  }
  return slicedLimes;
}

/**
 * Determines which juices still need to be prepared after the end of the shift.
 *
 * @param {number} timeLeft
 * @param {string[]} orders
 * @returns {string[]} remaining orders after the time is up
 */
export function remainingOrders(timeLeft, orders) {
  let remainingOrders = orders,
    remainingTime = timeLeft;
  while (remainingTime > 0) {
    remainingTime -= timeToMixJuice(remainingOrders[0]);
    remainingOrders.shift();
  }

  return remainingOrders;
}
