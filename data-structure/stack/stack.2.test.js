
const Stack = require('./stack.2')

const { assert } = require('chai');

describe('测试 stack', () => {
  it('LIFO', () => {
    const stack = new Stack()
    for (let i = 0; i < 5; i++) {
      stack.push(i)
    }

    assert.equal(stack.pop(), 4)
  })
 
  it('stackoverflow', () => {
    const stack = new Stack()
    let error = null;
    try {
      for (let i = 0; i < 1001; i++) {
        stack.push(i)
      }
    } catch (err) {
      error = err
    }
    
    assert.equal(error, 'stackoverflow')

  })

  it('stackunderflow', () => {
    const stack = new Stack()
    let error = null;
    try {
      stack.pop()
    } catch (err) {
      error = err
    }
    
    assert.equal(error, 'stackunderflow')

  })

  it('peek', () => {
    const stack = new Stack();
    for (let i = 0; i < 1000; i++) {
      stack.push(i)
    }

    assert.equal(stack.peek(), 999)

    stack.pop()
    assert.equal(stack.peek(), 998)
  })

  it('size', () => {
    const stack = new Stack();
    for (let i = 0; i < 1000; i++) {
      stack.push(i)
    }

    assert.equal(stack.size, 1000)
    stack.pop()
    assert.equal(stack.size, 999)
  })

  it('isEmpty', () => {
    const stack = new Stack();
    for (let i = 0; i < 1000; i++) {
      stack.push(i)
    }

    assert.equal(stack.isEmpty(), false)

    while(stack.size) {
      stack.pop()
    }

    assert.equal(stack.isEmpty(), true)
  })

  it('clear', () => {
    const stack = new Stack();
    for (let i = 0; i < 1000; i++) {
      stack.push(i)
    }

    stack.clear()
    assert.deepEqual(stack.data, new Array(1000))

    assert.equal(stack.size, 0)
  })

})