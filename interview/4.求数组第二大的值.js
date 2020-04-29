/**
 * 求数组第二大的值，要求时间复杂度是O(n)
 * 不准排序
 */

function getSecondValue(arr) {
  if (!Array.isArray(arr) || arr.length === 0) { return }

  let first
  let second
  for (let i = 0; i < arr.length; i++) {
    const num = arr[i];
    if (i === 0) {
      first = num
      continue
    } 
    if (num > first) {
      second = first
      first = num
    } else if (num > second) {
      second = num
    }
  }
  return second
}

console.log(getSecondValue([10, 4, 12, 33, 1, 3, 13]))
