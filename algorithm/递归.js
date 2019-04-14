

// 非递归
console.time('reduce')
function fib(n) {
  return Array.from({length: n}).reduce(
    ([a, b]) => [b, a+b],
    [0, 1]
  )[1]
}
console.timeEnd('reduce')
console.log( fib(100) )
