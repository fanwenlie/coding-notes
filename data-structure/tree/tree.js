/** 
 * 二叉树
 * 
*/
class BinaryTreeNode {
  constructor(key, value) {
    // 指向父节点
    this.p = null
    // 指向左节点
    this.left = null
    // 指向右节点
    this.right = null

    // 键值
    this.key = key
    // 卫星数据
    this.value = value
  }
}

class Tree {
  constructor() {
    this.root = null
  }

  insert(key, value) {
    const node = new BinaryTreeNode(key, value)
    let p = this.root
    // 尾指针
    let tail = this.root
    while (tail) {
      p = tail

      if (key < tail.key) {
        tail = tail.left
      } else {
        tail = tail.right
      }
    }

    if (!p) {
      this.root = node
      return
    }

    // 插入
    if (p.key < key) {
      p.right = node
    } else {
      p.left = node
    }

    node.p = p
  }

  transverse() {
    return this.__transverse(this.root)
  }

  // 用generator实现中序遍历
  *__transverse (node) {
    if (!node) { return }
    yield* this.__transverse(node.left)
    yield node
    yield* this.__transverse(node.right)
  }

  // 先序遍历-递归
  preOrder() {
    const result = []
    function pre(node) {
      if (node) {
        result.push(node.key)
        pre(node.left)
        pre(node.right)
      }
    }
    pre(this.root)

    return result
  }

  // 先序遍历-用迭代的方式
  preOrderLoop() {
    const { root } = this
    const result = []
    const stack = [root]
    while (stack.length) {
      const node = stack.pop()
      result.push(node.key)
      if (node.right) {
        stack.push(node.right)
      }
      if (node.left) {
        stack.push(node.left)
      }
    }
    return result
  }

  // 中序遍历
  inOrder() {
    const result = []
    
    function order(node) {
      if (node) {
        order(node.left)
        result.push(node.key)
        order(node.right)
      }
    }
    order(this.root)

    return result
  }

  // 后序遍历
  postOder() {
    const result = []
    
    function order(node) {
      if (node) {
        order(node.left)
        order(node.right)
        result.push(node.key)
      }
    }
    order(this.root)

    return result
  }
} 

module.exports = Tree