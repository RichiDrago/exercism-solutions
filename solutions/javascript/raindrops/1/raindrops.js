export const convert = (number) => {
  let raindropSounds = "";

  if (number % 3 === 0) raindropSounds += "Pling";
  if (number % 5 === 0) raindropSounds += "Plang";
  if (number % 7 === 0) raindropSounds += "Plong";

  return raindropSounds || String(number);
};
