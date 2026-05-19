export class List {
  constructor(values = []) {
    this.values = values;
  }

  /**
   *
   * @param {List} other
   */
  append(other) {
    return new List([...this.values, ...other.values]);
  }

  /**
   *
   * @param {List} other
   */
  concat(other) {
    let flattened = [];
    for (const item of other.values) {
      if (item instanceof List) {
        for (const v of item.values) {
          flattened[flattened.length] = v;
        }
      } else {
        flattened[flattened.length] = item;
      }
    }
    return new List([...this.values, ...flattened]);
  }

  filter(predicate) {
    let filteredValues = [];
    for (const item of this.values) {
      if (predicate(item)) filteredValues.push(item);
    }
    return new List([...filteredValues]);
  }

  map(callback) {
    let newValues = [];
    for (const item of this.values) {
      newValues.push(callback(item));
    }
    return new List([...newValues]);
  }

  length() {
    let counter = 0;
    for (const item of this.values) {
      counter++;
    }
    return counter;
  }

  foldl(callback, initialValue) {
    let acc = initialValue;
    for (const item of this.values) {
      acc = callback(acc, item);
    }
    return acc;
  }

  foldr(callback, initialValue) {
    let acc = initialValue;
    for (let i = this.values.length - 1; i >= 0; i--) {
      acc = callback(acc, this.values[i]);
    }
    return acc;
  }

  reverse() {
    let reverseValues = [];
    for (let i = this.values.length - 1; i >= 0; i--) {
      reverseValues.push(this.values[i]);
    }
    return new List([...reverseValues]);
  }
}
