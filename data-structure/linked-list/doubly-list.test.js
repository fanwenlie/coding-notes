
const List = require('./list')

const { assert } = require('chai')

describe('测试链表', () => {
  it('search', () => {
    const list = new List()

    for (let i = 0; i < 10; i++) {
      const node = List.createNode(i)
      list.insert(node)
    }

    assert.equal(list.search(5).key, 5)
  })
})