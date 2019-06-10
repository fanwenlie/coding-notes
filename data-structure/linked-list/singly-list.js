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
class SinglyList {
  constructor() {
    this.head = null
  }

  static createNode(key) {
    return new ListNode(key)
  }

  /**
   * TODO: 目前只实现插入到链表末尾
   * @param {Object} node 
   */
  insert(node) {
    node.next = null
    // 头指针指向第一个插入的node
    if (!this.head) {
      this.head = node
      return;
    }
    
    const lastNode = this.findLastNode()
    lastNode.next = node
  }

  search(key) {
    let node = this.head
    while (node && node.key !== key) {
      node = node.next
    }
    return node
  }

  delete(node) {
    const { next } = node
    delete node.next

    const prevNode = this.findPrevNode(node)
    // 代表node是第一个元素
    if (prevNode === null) {
      this.head = next
      return;
    }
    prevNode.next = next
  }

  /**
   * 获取链表的最后一个node
   */
  findLastNode() {
    let node = this.head
    while (node && node.next) {
      node = node.next
    }
    return node
  }
  /**
   * 获取指定node的上一个node
   * @param {Object} node 
   * 
   */
  findPrevNode(node) {
    let tempNode = this.head
    if (this.head === node) { return null }

    while (tempNode && tempNode.next !== node) {
      tempNode = tempNode.next
    }
    return tempNode
  }
}

module.exports = SinglyList