/**
 * [new 运算符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new)
 * 模拟new运算符实现，我们需要知道new做了些什么
 * 1. 创建了一个新的对象，this指向该对象
 * 2. 如果返回值不是引用类型，则返回该对象
 * 3. 对象的__proto__指向函数的原型
 * 通过_new(fn, arg1, arg2...)这种方式使用
 */

function _new(fn, ...args) {
  // 不要直接操作__proto__属性：[__proto__属性详解](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/proto)
  // const obj = {
  //   __proto__: fn.prototype
  // }
  const obj = Object.create(fn.prototype)
  const result = fn.apply(obj, args)
  const REF_TYPES = ['object', 'function']
  return result !== null && REF_TYPES.includes(typeof result) ? result : obj
}

function Zoo(a, b) {
  this.a = a
  this.b = b
}

console.log(_new(Zoo, 1, 1))