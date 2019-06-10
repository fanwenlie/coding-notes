const Queue = require('./stack2queue')

const { assert } = require('chai')

describe('测试stack2queue', () => {
  it('FIFO', () => {
    const queue = new Queue()

    for (let i = 0; i < 1000; i++) {
      queue.enqueue(i) 
    }
    assert.equal(queue.dequeue(), 0)
    assert.equal(queue.dequeue(), 1)
    assert.equal(queue.dequeue(), 2)
    assert.equal(queue.dequeue(), 3)
  })

  it('overflow', () => {
    const queue = new Queue()

    let errText = null
    try {
      for (let i = 0; i < 1001; i++) {
        queue.enqueue(i) 
      }
    } catch (error) {
      errText = error;
    }
    assert.equal(errText, 'stackoverflow')
  })

  it('underflow', () => {
    const queue = new Queue()

    let errText = null
    try {
      for (let i = 0; i < 10; i++) {
        queue.dequeue() 
      }
    } catch (error) {
      errText = error;
    }
    assert.equal(errText, 'stackunderflow')
  })
})