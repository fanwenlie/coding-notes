/** 
 * 链表节点
*/
class ListNode {
  constructor(key) {
    // 数据, 或者说y用于查找的键 
    this.key = key
    // 指向上一节点
    this.prev = null
    // 指向下一节点
    this.next = null
  }
}

/** 
 * 双向链表
*/
class List {
  constructor() {
    // 头指针
    this.head = null
  }

  static createNode(key) {
    return new ListNode(key)
  }

  insert(node) {
    node.prev = null
    node.next = this.head
    if (this.head) {
      this.head.prev = node
    }
    // head指针指向最后插入的node
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