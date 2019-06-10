const Queue = require('../queue/queue.2')

class Stack {
  constructor(max = 1000) {
    this.q1 = new Queue(max)
    this.q2 = new Queue(max)
  }

  push(item) {
    this.q1.enqueue(item)
  }

  pop() {
    if (this.q2.length) { return this.q2.dequeue()}

    let len = this.q1.length;
    while (len >= 0) {
      len--
      this.q2.enqueue(this.q1.data[len])
      this.q1.dequeue()
    }
    return this.q2.dequeue()
  }
  
}

module.exports = Stack