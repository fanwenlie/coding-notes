const Stack = require('./queue2stack')

const { assert } = require('chai')

describe('测试queue2stack', () => {
  it('FILO', () => {
    const stack = new Stack()

    for (let i = 0; i < 3; i++) {
      stack.push(i)
    }
    
    assert.equal(stack.pop(), 2)
    assert.equal(stack.pop(), 1)
    assert.equal(stack.pop(), 0)

    let errText = null
    try {
      stack.pop()
    } catch (error) {
      errText = error
    }
    
    assert.equal(errText, 'underflow')
  })
})