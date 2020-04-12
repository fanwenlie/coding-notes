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

      if (tail && key < tail.key) {
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

  // 中序遍历
  *__transverse (node) {
    if (!node) { return }
    yield* this.__transverse(node.left)
    yield node
    yield* this.__transverse(node.right)
  }

} 

module.exports = Tree