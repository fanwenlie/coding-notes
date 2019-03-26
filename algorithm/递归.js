

// 非递归
console.time('reduce递归')
function fib(n) {
  return Array.from({length: n}).reduce(
    ([a, b]) => [b, a+b],
    [0, 1]
  )[1]
}
console.timeEnd('reduce递归')
console.log( fib(100) )
