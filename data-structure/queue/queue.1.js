/**
 * 栈：先进先出(FIFO).
 * 
 * 常用方法：
 * enqueue 向队列尾部添加一个(或多个)新的项
 * dequeue 移除队列的第一(即排在队列最前面的)项，并返回被移除的元素
 * head 返回队列第一个元素，队列不做任何变动
 * tail 返回队列最后一个元素，队列不做任何变动
 * isEmpty 队列内无元素返回 true，否则返回 false
 * size 返回队列内元素个数
 * clear 清空队列
 */

class Queue {
  constructor () {
    this._arr = []
  }

  enqueue (item) {
    this._arr.push(item)
  }

  dequeue () {
    return this._arr.unshift()
  }

  head () {
    return this._arr[0]
  }

  tail () {
    return this._arr[this._arr.length - 1]
  }

  isEmpty () {
    return !this._arr.length
  }

  size () {
    return this._arr.length
  }

  clear () {
    this._arr = []
  }
}