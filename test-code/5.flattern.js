function flattern(arr) {
  return [].concat(
    ...arr.map( x => Array.isArray(x) ? flattern(x) : x)
  )
}

console.log( flattern( [1, 2, 3, [1, 2, 3, [444, 6]] ] ) )

/**
 * 用栈来取代递归
 * 性能比直接递归形成的函数调用栈快 
 */
function flat(arr) {
  // 如果直接用arr不太好，因为会改变数组，复制一份比较保险
  let stack = arr.slice()
  let ret = []

  while (stack.length) {
    const item = stack.pop()
    if (Array.isArray(item)) {
      stack = stack.concat(item)
    } else {
      ret.push(item)
    }
  }

  return ret
}

console.log( flat( [1, 2, 3, [1, 2, 3, [444, 6]] ] ) )