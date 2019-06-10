/**
 * 栈可以实现队列
 * 队列也可以实现栈
 * 
 * 具体实现方式
 */
const Stack = require('../stack/stack.2')

class Queue {
  constructor(max = 1000) {
    this.max = max
    this.s1 = new Stack(max)
    this.s2 = new Stack(max)

  }

  enqueue(item) {
    this.s1.push(item)
  }

  dequeue() {
    // 性能优化：我们不能每次dequeue都清空s1，当s2还有值时，可以直接返回
    if(this.s2.size > 0) { return this.s2.pop() }
    
    while (this.s1.size) {
      this.s2.push(this.s1.pop())
    }

    return this.s2.pop()
  }
}

module.exports = Queue