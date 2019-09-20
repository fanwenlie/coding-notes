const { assert } = require('chai')
const compose = require('../compose')

describe('测试compose', () => {
  it('1', () => {
    var toUpperCase = (str) => str.toUpperCase()
    var reverse = (arr) => arr.reverse()
    var head = (arr) => arr[0]

    var reverseHeadUpperCase = compose(toUpperCase, head, reverse)

    assert.equal(reverseHeadUpperCase(['apple', 'banana', 'peach']), 'PEACH')
  })
})