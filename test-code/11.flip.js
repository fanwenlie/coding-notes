// 一道面试题：实现一个函数，它接受一个函数参数，然后将该函数第一个参数作为最后一个参数

const flip = fn => (...args) => fn(args.pop(), ...args)

const f = fn(Object.assign)

const obj = f({ a: 1 }, { a: 2 })

console.log(obj) // output: { a: 1 }