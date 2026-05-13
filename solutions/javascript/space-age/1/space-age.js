/**
 *
 * @param {"pluto" | "mercury" | "venus" | "earth" | "mars" | "jupiter" | "saturn" | "uranus" | "neptune"} planet
 * @param {number} age
 */
export const age = (planet, age) => {
  const planets = [
    "pluto",
    "mercury",
    "venus",
    "earth",
    "mars",
    "jupiter",
    "saturn",
    "uranus",
    "neptune",
  ];

  if (!planets.includes(planet)) throw new Error("not a planet");

  const agePlanetConversion = {
    mercury: 0.2408467,
    venus: 0.61519726,
    earth: 1.0,
    mars: 1.8808158,
    jupiter: 11.862615,
    saturn: 29.447498,
    uranus: 84.016846,
    neptune: 164.79132,
  };
  const SECONDS_IN_ONE_YEAR =
    1 * 60 * 60 * 24 * (365.25 * agePlanetConversion[planet]);

  return parseFloat((age / SECONDS_IN_ONE_YEAR).toFixed(2));
};
