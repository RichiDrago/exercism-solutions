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
    const { width, height } = newSize;
    const newWidth =
      width < 1
        ? 1
        : width + this.position.x > this.screenSize.width
          ? this.screenSize.width - this.position.x
          : width;
    const newHeight =
      height < 1
        ? 1
        : height + this.position.y > this.screenSize.height
          ? this.screenSize.height - this.position.y
          : height;

    this.size.resize(newWidth, newHeight);
  }

  /**
   *
   * @param {Position} newPosition
   */
  move(newPosition) {
    const { x, y } = newPosition;
    const newX =
      x < 0
        ? 0
        : x + this.size.width > this.screenSize.width
          ? this.screenSize.width - this.size.width
          : x;
    const newY =
      y < 0
        ? 0
        : y + this.size.height > this.screenSize.height
          ? this.screenSize.height - this.size.height
          : y;
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
