const { assert } = require('chai')
const Tree = require('./tree')

describe('测试二叉树', () => {
  it('insert', () => {
    const tree = new Tree()

    tree.insert(2)
    tree.insert(3)
    tree.insert(10)
    tree.insert(1)
    
    const keys = [...tree.transverse()].map(node => node.key)
    assert.deepEqual(keys, [1, 2, 3, 10])
  }) 

  it('preOderLoop', () => {
    const tree = new Tree()

    tree.insert(2)
    tree.insert(3)
    tree.insert(10)
    tree.insert(1)
    tree.insert(0)
    tree.insert(1.5)
    tree.insert(2.5)

    /**
     *       2
     *     /   \
     *    1      3
     *   / \    /  \
     *  0  1.5 2.5  10
     */

    const keys = tree.preOrderLoop()
    assert.deepEqual(keys, [2, 1, 0, 1.5, 3, 2.5, 10])
  }) 

  it('inOder', () => {
    const tree = new Tree()

    tree.insert(2)
    tree.insert(3)
    tree.insert(10)
    tree.insert(1)
    tree.insert(0)
    tree.insert(1.5)
    tree.insert(2.5)

    const keys = tree.inOrder()
    assert.deepEqual(keys, [0, 1, 1.5, 2, 2.5, 3, 10])
  }) 

  it('postOder', () => {
    const tree = new Tree()

    tree.insert(2)
    tree.insert(3)
    tree.insert(10)
    tree.insert(1)
    tree.insert(0)
    tree.insert(1.5)
    tree.insert(2.5)

    const keys = tree.postOder()
    assert.deepEqual(keys, [0, 1.5, 1, 2.5, 10, 3, 2])
  })

  it('maxDepth', () => {
    const tree = new Tree()

    tree.insert(2)
    tree.insert(3)
    tree.insert(10)
    tree.insert(1)
    tree.insert(0)
    tree.insert(1.5)
    tree.insert(2.5)

    const depth = tree.maxDepth()
    assert.equal(depth, 3)
  })
})
