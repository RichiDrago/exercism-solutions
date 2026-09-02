// After some research, I found that tracking tail and size references
// allows most operations to run in O(1) instead of O(n).

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
    /** @type {Node | null} */ this.tail = null;
    /** @type {number}      */ this.size = 0;
  }

  // O(1)
  push(value) {
    const node = new Node(value);
    if (!this.tail) {
      this.head = this.tail = node;
    } else {
      node.prev = this.tail;
      this.tail.next = node;
      this.tail = node;
    }
    this.size++;
  }

  // O(1)
  pop() {
    if (!this.tail) return null;
    const value = this.tail.value;
    if (this.head === this.tail) {
      this.head = this.tail = null;
    } else {
      this.tail = this.tail.prev;
      this.tail.next = null;
    }
    this.size--;
    return value;
  }

  // O(1)
  shift() {
    if (!this.head) return null;
    const value = this.head.value;
    if (this.head === this.tail) {
      this.head = this.tail = null;
    } else {
      this.head = this.head.next;
      this.head.prev = null;
    }
    this.size--;
    return value;
  }

  // O(1)
  unshift(value) {
    const node = new Node(value);
    if (!this.head) {
      this.head = this.tail = node;
    } else {
      node.next = this.head;
      this.head.prev = node;
      this.head = node;
    }
    this.size++;
  }

  // O(n)
  delete(value) {
    let node = this.head;
    while (node) {
      if (node.value === value) {
        if (node.prev) node.prev.next = node.next;
        else this.head = node.next;
        if (node.next) node.next.prev = node.prev;
        else this.tail = node.prev;
        this.size--;
        return;
      }
      node = node.next;
    }
  }

  // O(1)
  count() {
    return this.size;
  }
}
