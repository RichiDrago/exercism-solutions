export class SplitSecondStopwatch {
  constructor() {
    this._state = "ready";
    this._currentLap = 0;
    this._currentLapTime;
    this._previousLaps = [];
    this._timer;
  }

  get state() {
    return this._state;
  }

  get currentLap() {
    return this.#formatTime(this._currentLap);
  }

  get total() {
    return this.#formatTime(
      this._currentLap +
        this._previousLaps.reduce((acc, currentValue) => acc + currentValue, 0),
    );
  }

  get previousLaps() {
    return this._previousLaps.map((l) => this.#formatTime(l));
  }

  #formatTime(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return [h, m, s].map((v) => String(v).padStart(2, "0")).join(":");
  }

  #parseTime(timeString) {
    const [h, m, s] = timeString.split(":");
    return parseInt(h) * 3600 + parseInt(m) * 60 + parseInt(s);
  }

  start() {
    if (this._state === "running")
      throw new Error("cannot start an already running stopwatch");
    this._state = "running";
    this._currentLapTime = Date.now();
  }

  stop() {
    if (this._state !== "running")
      throw new Error("cannot stop a stopwatch that is not running");
    this._state = "stopped";
    this._currentLap += Math.floor((Date.now() - this._currentLapTime) / 1000);
    this._currentLapTime = null;
  }

  lap() {
    if (this._state !== "running")
      throw new Error("cannot lap a stopwatch that is not running");
    let currentLap =
      this._currentLap + Math.floor((Date.now() - this._currentLapTime) / 1000);
    this._currentLap = 0;
    this._currentLapTime = Date.now();
    this._previousLaps.push(currentLap);
  }

  reset() {
    if (this._state !== "stopped")
      throw new Error("cannot reset a stopwatch that is not stopped");
    this._state = "ready";
    this._currentLap = 0;
    this._currentLapTime = null;
    this._previousLaps = [];
  }

  advanceTime(duration) {
    if (this._state !== "running") return;
    this._currentLap += this.#parseTime(duration);
  }
}
