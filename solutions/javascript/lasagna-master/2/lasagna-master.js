/// <reference path="./global.d.ts" />
// @ts-check

/**
 * Returns the cooking status of the lasagna based on the remaining time.
 *
 * @param {number | undefined} timeLeft - The remaining cooking time in minutes.
 * @returns {string} A message indicating whether the lasagna is done, still cooking, or if the timer was not set.
 */
export function cookingStatus(timeLeft) {
  switch (timeLeft) {
    case 0:
      return "Lasagna is done.";
    case undefined:
      return "You forgot to set the timer.";
    default:
      return "Not done, please wait.";
  }
}

/**
 * Calculates total preparation time.
 *
 * @param {string[]} layers - Lasagna layers.
 * @param {number} [averagePreparationTime=2] - Time per layer (minutes).
 * @returns {number} Total time in minutes.
 */
export function preparationTime(layers, averagePreparationTime = 2) {
  return layers.length * averagePreparationTime;
}

/**
 * Counts required quantities of noodles and sauce.
 *
 * @param {string[]} layers - Lasagna layers.
 * @returns {{noodles: number, sauce: number}} Required quantities.
 */
export function quantities(layers) {
  const counts = layers.reduce(
    (acc, layer) => {
      if (layer === "noodles") acc.noodles++;
      if (layer === "sauce") acc.sauce++;
      return acc;
    },
    { noodles: 0, sauce: 0 },
  );

  return {
    noodles: counts.noodles * 50,
    sauce: counts.sauce * 0.2,
  };
}

/**
 * Adds the last ingredient from a friend's list to your list.
 *
 * @param {string[]} friendsList - Friend's ingredient list.
 * @param {string[]} myList - Your ingredient list
 */
export function addSecretIngredient(friendsList, myList) {
  myList.push(friendsList.at(-1) ?? "");
}

/**
 * Scales a recipe proportionally based on a scaling factor.
 *
 * @param {Record<string,number>} recipe - Recipe with ingredient quantities.
 * @param {number} [scale=2] - Scaling factor.
 * @returns {Record<string,number>} Scaled recipe.
 */
export function scaleRecipe(recipe, scale = 2) {
  const scaledRecipe = { ...recipe };

  for (let key in scaledRecipe) {
    scaledRecipe[key] *= scale / 2;
  }

  return scaledRecipe;
}
