/**
 * 栈：后进先出(LIFO).
 * 
 * 常用方法：
 * push 添加一个（或几个）新元素到栈顶
 * pop 弹出栈顶元素，同时返回被移除的元素
 * peek 返回栈顶元素，不对栈做修改
 * isEmpty 栈内无元素返回 true，否则返回 false
 * size 返回栈内元素个数
 * clear 清空栈
 */

class Stack {
  constructor(max = 1000){
    this.data = new Array(max)
    this.max = max
    // 栈顶(栈指针)
    this.top = -1
  }

  // 后进：向栈内添加一个元素
  push(item){
    if (this.top === this.max - 1) {
      throw 'stackoverflow'
    }
    this.top++
    this.data[this.top] = item;
  }
 
  // 先出：删除栈顶元素
  pop(){
    if (this.top === -1) {
      throw 'stackunderflow'
    }
    const item = this.data[this.top]
    this.top--
    return item;
  }

  // 查看栈顶元素
  peek(){
    return this.data[this.top]
  }

  isEmpty(){
    return !this.size
  }

  get size(){
    return this.top + 1
  }

  clear(){
    this.data = new Array(this.max)
    this.top = -1
  }
  
}



module.exports = Stack

