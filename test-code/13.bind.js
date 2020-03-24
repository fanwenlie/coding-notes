/**
 * 模拟原生bind函数实现
 * 首先，bind函数的参数有多个，bind(thisArg, arg1, arg2...)；
 * 然后，返回值是一个函数, 该函数的this指向thisArg，并拥有多个参数arg1、arg2....
 * 最后，需要考虑使用new的情况
 */

Function.prototype._bind = function(context, ...args) {
  const that = this
  return function F() {
    if (this instanceof F) {
      return new that(...args, ...arguments)
    }
    return that.apply(context, args.concat(...arguments))
  }
}