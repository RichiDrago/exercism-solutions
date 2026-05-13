/// <reference path="./global.d.ts" />
// @ts-check

/**
 * Determine the price of the pizza given the pizza and optional extras
 *
 * @param {Pizza} pizza name of the pizza to be made
 * @param {Extra[]} extras list of extras
 *
 * @returns {number} the price of the pizza
 */
export function pizzaPrice(pizza, ...extras) {
  if (extras.length === 0) {
    switch (pizza) {
      case "Margherita":
        return 7;
      case "Caprese":
        return 9;
      case "Formaggio":
        return 10;
    }
  }

  const [firstElement, ...rest] = extras;
  return (
    (firstElement === "ExtraToppings" ? 2 : 1) + pizzaPrice(pizza, ...rest)
  );
}

/**
 * Determine the price of the pizza given the pizza and optional extras
 * using imperative loop
 *
 * @param {Pizza} pizza name of the pizza to be made
 * @param {Extra[]} extras list of extras
 *
 * @returns {number} the price of the pizza
 */
export function imperativePizzaPrice(pizza, ...extras) {
  const basePrices = {
    Margherita: 7,
    Caprese: 9,
    Formaggio: 10,
  };

  const extrasPrice = extras.reduce(
    (total, extra) => total + (extra === "ExtraToppings" ? 2 : 1),
    0,
  );

  return basePrices[pizza] + extrasPrice;
}

/**
 * Calculate the price of the total order, given individual orders
 *
 * (HINT: For this exercise, you can take a look at the supplied "global.d.ts" file
 * for a more info about the type definitions used)
 *
 * @param {PizzaOrder[]} pizzaOrders a list of pizza orders
 * @returns {number} the price of the total order
 */
export function orderPrice(pizzaOrders) {
  let totalPrize = 0;
  for (const pizzaOrder of pizzaOrders) {
    // totalPrize += pizzaPrice(pizzaOrder.pizza, ...pizzaOrder.extras); // => RangeError: Maximum call stack size exceeded
    totalPrize += imperativePizzaPrice(pizzaOrder.pizza, ...pizzaOrder.extras);
  }
  return totalPrize;
}
