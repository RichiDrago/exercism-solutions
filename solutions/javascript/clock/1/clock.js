export class Clock {
  constructor(hours, minutes = 0) {
    this.hours = this.wrapHours24(hours, minutes);
    this.minutes = this.wrapMinutes60(minutes);
  }

  wrapHours24(hours, minutes) {
    let tempHours = hours;
    tempHours += Math.floor(minutes / 60);

    if (tempHours >= 0) {
      return tempHours % 24;
    } else {
      return ((tempHours % 24) + 24) % 24;
    }
  }

  wrapMinutes60(minutes) {
    if (minutes >= 0) {
      return minutes % 60;
    } else {
      return ((minutes % 60) + 60) % 60;
    }
  }

  pad(number) {
    return number.toString().padStart(2, "0");
  }

  toString() {
    return `${this.pad(this.hours)}:${this.pad(this.minutes)}`;
  }

  plus(additionalMinutes = 0) {
    this.hours = this.wrapHours24(this.hours, this.minutes + additionalMinutes);
    this.minutes = this.wrapMinutes60(this.minutes + additionalMinutes);
    return this;
  }

  minus(minutesToSubtract = 0) {
    this.hours = this.wrapHours24(this.hours, this.minutes - minutesToSubtract);
    this.minutes = this.wrapMinutes60(this.minutes - minutesToSubtract);
    return this;
  }

  equals(clock) {
    return this.toString() === clock.toString();
  }
}
