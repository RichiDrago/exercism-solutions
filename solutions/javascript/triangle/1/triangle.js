export class Triangle {
  constructor(...sides) {
    if (sides.length !== 3) {
      throw new Error("A triangle must have exactly 3 sides");
    }

    const [a, b, c] = sides;

    this.isValidTriangle = a + b > c && a + c > b && b + c > a;
    this.sides = new Set(sides);
  }

  get isEquilateral() {
    return this.isValidTriangle && this.sides.size === 1;
  }

  get isIsosceles() {
    return this.isValidTriangle && this.sides.size < 3;
  }

  get isScalene() {
    return this.isValidTriangle && this.sides.size === 3;
  }
}
