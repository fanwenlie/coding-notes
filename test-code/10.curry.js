/**
 * 函数柯里化(curry): 将多个入参的函数转化为一个入参的函数;
 * 若传进去的参数个数未达到 curryAdd 的个数，则将参数缓存在闭包变量 lists 中:
 * 满足判断条件必须清空lists，避免多次调用curryAdd发生错误
 */
function curry(fn, ...params) {
  const len = fn.length
  let lists = params || []
  let listsLen
  return function (...args) {
    lists = [...lists, ...args]
    listsLen = lists.length
    if (listsLen < len) {
      const temp = lists
      lists = []
      return curry(fn, ...temp)
    }
    if (listsLen === len) {
      const temp = lists
      lists = []
      return fn.apply(this, temp)
    }
  }
}



const { assert } = require('chai')

describe('测试curry', () => {
  it('curry add', () => {
    const add = (a, b, c) => a + b + c
    const curryAdd = curry(add)   
    assert.equal(curryAdd(1)(2)(3), 6)
    assert.equal(curryAdd(4)(5)(6), 15)
  })
})