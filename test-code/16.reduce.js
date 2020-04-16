/**
 * 模拟reduce实现
 */

Array.prototype.myReduce = function(fn, initVal) {
  const arr = this
  const hasInitVal = typeof initVal !== 'undefined'
  let acc = hasInitVal ? initVal : arr[0]
  let idx = 0

  !hasInitVal && (idx = 1)

  for (let i = idx; i < arr.length; i++) {
    acc = fn(acc, arr[i], i, arr)
  }
  return acc
}

const result = [{ val: 1 }, { val: 2 }, { val: 3 }].myReduce((acc, cur) => { 
  console.log('f', acc)
  return {
    val: acc.val + cur.val
  }
})

console.log(result)