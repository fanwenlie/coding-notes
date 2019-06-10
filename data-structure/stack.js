/**
 * 栈：后进先出(LIFO).
 * 
 * 常用方法：
 * push 添加一个（或几个）新元素到栈顶
 * pop 溢出栈顶元素，同时返回被移除的元素
 * peek 返回栈顶元素，不对栈做修改
 * isEmpty 栈内无元素返回 true，否则返回 false
 * size 返回栈内元素个数
 * clear 清空栈
 */

class Stack {
  constructor(){
    this._arr = []
  }

  // 后进：向栈内添加一个元素
  push(item){
    this._arr.push(item)
  }

  // 先出：删除栈顶元素
  pop(){
    return this._arr.pop()
  }

  // 查看栈顶元素
  peek(){
    return this._arr[this._arr.length - 1]
  }

  isEmpty(){
    return !this._arr.length
  }

  size(){
    return this._arr.length
  }

  clear(){
    this._arr = []
  }
  
}

const stack = new Stack()

stack.push(1111)

console.log(stack.peek())