class Node {
  /** @param {number} value */
  constructor(value) {
    /** @type {number}      */ this.value = value;
    /** @type {Node | null} */ this.prev = null;
    /** @type {Node | null} */ this.next = null;
  }
}

export class LinkedList {
  constructor() {
    /** @type {Node | null} */ this.head = null;
  }

  push(station) {
    const newNode = new Node(station);
    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) current = current.next;
      current.next = newNode;
      newNode.prev = current;
    }
  }

  pop() {
    if (!this.head) return null;
    let current = this.head;
    while (current.next) current = current.next;
    if (!current.prev) {
      this.head = null;
    } else {
      current.prev.next = null;
    }
    return current.value;
  }

  shift() {
    if (!this.head) return null;
    const value = this.head.value;
    this.head = this.head.next;
    if (this.head) this.head.prev = null;
    return value;
  }

  unshift(station) {
    const newNode = new Node(station);
    if (this.head) {
      newNode.next = this.head;
      this.head.prev = newNode;
    }
    this.head = newNode;
  }

  delete(station) {
    let node = this.head;
    while (node) {
      if (node.value === station) {
        if (node.prev) node.prev.next = node.next;
        else this.head = node.next;
        if (node.next) node.next.prev = node.prev;
        return;
      }
      node = node.next;
    }
  }

  count() {
    let current = this.head,
      count = 0;
    while (current) {
      count++;
      current = current.next;
    }
    return count;
  }
}
