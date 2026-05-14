class Node {
  constructor(value) {
    /**
     * @type {number}
     */
    this.value = value;
    /**
     * @type {Node | null}
     */
    this.prev = null;
    /**
     * @type {Node | null}
     */
    this.next = null;
  }
}

export class LinkedList {
  constructor() {
    /**
     * @type {Node | null}
     */
    this.head = null;
  }

  getLastNode() {
    let current = this.head;
    while (current && current.next) {
      current = current.next;
    }
    return current;
  }

  push(station) {
    let lastNode = this.getLastNode();
    if (!lastNode) {
      this.head = new Node(station);
    } else {
      const newNode = new Node(station);
      lastNode.next = newNode;
      newNode.prev = lastNode;
    }
  }

  pop() {
    let lastNode = this.getLastNode();
    if (!lastNode) return null;
    if (!lastNode.prev && !lastNode.next) {
      this.head = null;
    } else {
      const secondToLastNode = lastNode.prev;
      if (secondToLastNode) secondToLastNode.next = null;
    }
    return lastNode.value;
  }

  shift() {
    const firtNode = this.head;
    this.head = firtNode.next;
    if (this.head) this.head.prev = null;
    return firtNode.value;
  }

  unshift(station) {
    if (this.head) {
      const firstNode = this.head;
      this.head = new Node(station);
      this.head.next = firstNode;
      firstNode.prev = this.head;
    } else {
      this.head = new Node(station);
    }
  }

  delete(station) {
    let node = this.head;
    if (!node) return;
    while (node.next) {
      if (node.value === station) break;
      node = node.next;
    }

    if (node.value !== station) return;

    // only one node
    if (!node.prev && !node.next) {
      this.head = null;
    }
    // first node
    else if (!node.prev && node.next) {
      this.head = node.next;
      this.head.prev = null;
    }
    // last node
    else if (node.prev && !node.next) {
      node.prev.next = null;
    }
    // node beetween
    else {
      node.prev.next = node.next;
      node.next.prev = node.prev;
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
