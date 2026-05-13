// @ts-check

export function Size(width = 80, height = 60) {
  this.width = width;
  this.height = height;
}

Size.prototype.resize =
  /**
   *
   * @param {number} newWidth
   * @param {number} newHeight
   */
  function (newWidth, newHeight) {
    this.width = newWidth;
    this.height = newHeight;
  };

export function Position(x = 0, y = 0) {
  this.x = x;
  this.y = y;
}

Position.prototype.move =
  /**
   *
   * @param {number} newX
   * @param {number} newY
   */
  function (newX, newY) {
    this.x = newX;
    this.y = newY;
  };

export class ProgramWindow {
  constructor() {
    this.screenSize = new Size(800, 600);
    this.size = new Size();
    this.position = new Position();
  }

  /**
   *
   * @param {Size} newSize
   */
  resize(newSize) {
    const maxWidth = this.screenSize.width - this.position.x;
    const maxHeight = this.screenSize.height - this.position.y;

    const newWidth = Math.max(1, Math.min(newSize.width, maxWidth));
    const newHeight = Math.max(1, Math.min(newSize.height, maxHeight));

    this.size.resize(newWidth, newHeight);
  }

  /**
   *
   * @param {Position} newPosition
   */
  move(newPosition) {
    const maxX = this.screenSize.width - this.size.width;
    const maxY = this.screenSize.height - this.size.height;

    const newX = Math.max(0, Math.min(newPosition.x, maxX));
    const newY = Math.max(0, Math.min(newPosition.y, maxY));

    this.position.move(newX, newY);
  }
}

/**
 *
 * @param {ProgramWindow} newProgramWindow
 */
export function changeWindow(newProgramWindow) {
  newProgramWindow.resize(new Size(400, 300));
  newProgramWindow.move(new Position(100, 150));
  return newProgramWindow;
}
