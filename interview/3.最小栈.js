/**
 * 字节&leetcode155：最小栈（包含getMin函数的栈）
 * 
 * 设计一个支持 push ，pop ，top 操作，并能在常数时间O(1)内检索到最小元素的栈。
 * 
 * push(x) —— 将元素 x 推入栈中。 O(n)
 * pop() —— 删除栈顶的元素。 O(n)
 * top() —— 获取栈顶元素。 O(1)
 * getMin() —— 检索栈中的最小元素。 O(1)
 */

class MinStack {
  constructor() {
    this.data = []
    this.mins = []
  }

  push(item) {
    this.data.push(item)
    if (this.mins.length === 0) {
      this.mins.push(item)
      return
    }
    const last = this.mins[this.mins.length - 1]
    if (item <= last) {
      this.mins.push(item)
    }
  }

  pop() {
    const result = this.data.pop()
    const last = this.mins[this.mins.length - 1]
    if (last === result) {
      this.mins.pop()
    }

    return result
  }

  top() {
    return this.data[this.data.length - 1]
  }

  getMin() {
    return this.mins[this.mins.length - 1]
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