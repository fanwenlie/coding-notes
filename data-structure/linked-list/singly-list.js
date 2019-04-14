/** 
 * 链表节点
*/
class ListNode {
  constructor(key) {
    // 数据, 或者说用于查找的键 
    this.key = key
    // 指向下一节点
    this.next = null
  }
}

/** 
 * 单向链表
*/
class List {
  constructor() {
    this.head = null
  }

  static createNode(key) {
    return new ListNode(key)
  }

  insert(node) {
    node.next = this.head
    if (this.head) {
      this.head.prev = node
    }
    this.head = node
  }

  search(key) {
    let node = this.head
    while (node !== null && node.key !== key) {
      node = node.next
    }
    return node
  }

  delete(node) {
    const { prev, next } = node
    delete node.prev
    delete node.next

    if (node === this.head) {
      this.head = next
    }

    if (prev) {
      prev.next = next
    }
    if (next) {
      next.prev = prev
    }
  }
}

module.exports = List