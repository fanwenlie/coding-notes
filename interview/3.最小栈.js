/**
 * 字节&leetcode155：最小栈（包含getMin函数的栈）
 * 
 * 设计一个支持 push ，pop ，top 操作，并能在常数时间O(1)内检索到最小元素的栈。
 * 
 * push(x) —— 将元素 x 推入栈中。
 * pop() —— 删除栈顶的元素。
 * top() —— 获取栈顶元素。
 * getMin() —— 检索栈中的最小元素。
 */

class MinStack {
  constructor() {
    this.data = []
    this.min = undefined
  }

  push(item) {
    this.data.push(item)
    const { min } = this
    if (min === undefined) {
      this.min = item
      return
    }
    if (item < min) {
      this.min = item
    }
  }

  pop() {
    const result = this.data.pop()

    this.min = this.data.length === 0 ? undefined : Math.min(...this.data)

    return result
  }

  top() {
    return this.data[this.data.length - 1]
  }

  getMin() {
    return this.min
  }
}

const minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
console.log(minStack.getMin()) // -3
minStack.pop();
console.log(minStack.top()) // 0
console.log(minStack.getMin()) // -2