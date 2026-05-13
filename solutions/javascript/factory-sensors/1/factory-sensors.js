// @ts-check

export class ArgumentError extends Error {}

export class OverheatingError extends Error {
  /**
   *
   * @param {number} temperature
   */
  constructor(temperature) {
    super(`The temperature is ${temperature} ! Overheating !`);
    this.temperature = temperature;
  }
}

/**
 * Check if the humidity level is not too high.
 *
 * @param {number} humidityPercentage
 * @throws {Error}
 */
export function checkHumidityLevel(humidityPercentage) {
  if (humidityPercentage > 70) throw new Error();
}

/**
 * Check if the temperature is not too high.
 *
 * @param {number|null} temperature
 * @throws {ArgumentError|OverheatingError}
 */
export function reportOverheating(temperature) {
  if (temperature == undefined) throw new ArgumentError();
  if (temperature > 500) throw new OverheatingError(temperature);
}

/**
 *  Triggers the needed action depending on the result of the machine check.
 *
 * @param {{
 * check: function,
 * alertDeadSensor: function,
 * alertOverheating: function,
 * shutdown: function
 * }} actions
 * @throws {ArgumentError|OverheatingError|Error}
 */
export function monitorTheMachine(actions) {
  try {
    actions.check();
  } catch (e) {
    if (e instanceof ArgumentError) actions.alertDeadSensor();
    else if (e instanceof OverheatingError) {
      if (e.temperature > 600) {
        actions.shutdown();
      } else {
        actions.alertOverheating();
      }
    } else throw e;
  }
}
