/**
 * 栈：先进先出(FIFO).
 * 
 * head指针：指向队列头部
 * tail指针：指向队列尾部
 * 
 * 常用方法：
 * enqueue 向队列尾部添加一个(或多个)新的项
 * dequeue 移除队列的第一(即排在队列最前面的)项，并返回被移除的元素
 * getHead 返回队列第一个元素，队列不做任何变动
 * getTail 返回队列最后一个元素，队列不做任何变动
 * isEmpty 队列内无元素返回 true，否则返回 false
 * size/length 返回队列内元素个数
 * clear 清空队列
 */

class Queue {
  constructor (max = 1000) {
    this.data = new Array(max)
    this.max = max
    this.head = 0
    this.tail = 0
    // 维护size变量，用来区分错误边界
    this.size = 0
  }

  // 入列
  enqueue (item) {
    if (this.size === this.max) { throw 'overflow' }
    this.data[this.tail] = item;
    this.size++ 
    this.tail === this.max - 1 ? this.tail = 0 : this.tail++
  }

  // 出列
  dequeue () {
    if (this.size === 0) { throw 'underflow' }
    this.size--
    const item = this.data[this.head]
    this.head++
    return item
  }

  getHead () {
    return this.data[this.head]
  }

  getTail () {
    return this.data[this.tail - 1]
  }

  isEmpty () {
    return !this.size
  }

  get length () {
    return this.size
  }

  clear () {
    this.data = new Array(this.max)
    this.head = 0
    this.tail = 0
    this.size = 0
  }
}

module.exports = Queue;

