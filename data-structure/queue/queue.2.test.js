
const Queue = require('./queue.2')

const { assert } = require('chai')

describe('测试queue', () => {
  it('FIFO', () => {
    const queue = new Queue();
    for (let i = 0; i < 3; i++) {
      queue.enqueue(i)
    }

    assert.equal(queue.dequeue(), 0)
    assert.equal(queue.dequeue(), 1)
    assert.equal(queue.dequeue(), 2)
  })

  it('overflow', () => {
    const queue = new Queue();

    let error = null
    try {
      for (let i = 0; i < 1001; i++) {
        queue.enqueue(i)
      }
    } catch (err) {
      error = err
    }
    assert.equal(error, 'overflow')
    
  })

  it('overflow', () => {
    const queue = new Queue();

    let error = null
    try {
      for (let i = 0; i < 2; i++) {
        queue.dequeue(i)
      }
    } catch (err) {
      error = err
    }
    assert.equal(error, 'underflow')
    
  })

  it('getHead', () => {
    const queue = new Queue();
    for (let i = 0; i < 10; i++) {
      queue.enqueue('a' + i)
    }

    assert.equal(queue.getHead(), 'a0')
    assert.equal(queue.head, 0)

    for (let i = 0; i < 10; i++) {
      queue.dequeue()
    }

    assert.equal(queue.head, 10)
  })

  it('getTail', () => {
    const queue = new Queue();

    for (let i = 0; i < 10; i++) {
      queue.enqueue('a' + i)
    }
    assert.equal(queue.getTail(), 'a9')
    assert.equal(queue.tail, 10)

    for (let i = 0; i < 10; i++) {
      queue.dequeue()
    }
    assert.equal(queue.tail, 10)

    for (let i = 0; i < 10; i++) {
      queue.enqueue('a' + i)
    }
    assert.equal(queue.getTail(), 'a9')
    assert.equal(queue.tail, 20)

  })

  it('length/size', () => {
    const queue = new Queue();

    for (let i = 0; i < 10; i++) {
      queue.enqueue('a' + i)
    }
    assert.equal(queue.length, 10)
    assert.equal(queue.size, 10)

    for (let i = 0; i < 5; i++) {
      queue.dequeue('a' + i)
    }
    assert.equal(queue.length, 5)
    assert.equal(queue.size, 5)
  })

  it('clear', () => {
    const queue = new Queue();

    for (let i = 0; i < 10; i++) {
      queue.enqueue('a' + i)
    }

    queue.clear()

    assert.equal(queue.length, 0)
    assert.equal(queue.head, 0)
    assert.equal(queue.tail, 0)
    assert.deepEqual(queue.data, new Array(1000))
  })

})