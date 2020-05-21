const { assert } = require('chai')
const List = require('./singly-list')

describe('测试单向链表', () => {
  it('insert', () => {
    const list = new List()

    for (let i = 0; i < 5; i++) {
      const node = List.createNode(i)
      list.insert(node)
    }

    assert.equal(list.search(3).key, 3)
  })

  it('delete', () => {
    const list = new List()

    for (let i = 0; i < 5; i++) {
      const node = List.createNode(i)
      list.insert(node)
    }
    
    const tempNode = list.search(0)
    list.delete(tempNode)

    console.log(list)

    assert.equal(list.search(0), undefined)
  })
})