/**
 * 归并排序: 把一个大数组不断拆分成小数组，拆分到最后，在排序，合并
 * 时间复杂度 O(NlogN)
 * 利用空间换时间
 * 
 */




/**
 * 拆分
 * @param {*} p 开始索引
 * @param {*} r 数组长度
 */
function divide(p, r) {
  return Math.floor( (p + r) / 2);
}

/**
 * 合并
 * @param {*} A 数组
 * @param {*} p 开始起点
 * @param {*} q 结束位置
 * @param {*} r 数组长度
 */
function merge(A, p, q, r) {
  const A1 = A.slice(p, q)
  const A2 = A.slice(q, r)

  // 这是两个哨兵，减少if判断边界, 更不容易出错
  // POSITIVE_INFINITY 正无穷 不管哪个数字与之比较，都比它小
  // MAX_SAFE_INTEGER JS的最大安全数 (2^53 - 1)
  A1.push(Number.POSITIVE_INFINITY)
  A2.push(Number.MAX_SAFE_INTEGER)

  for (let i = p, j = 0, k = 0; i < r; i++) {
    if (A1[j] < A2[k]) {
      A[i] =  A1[j++]
    } else {
      A[i] =  A2[k++]
    }
  }


  return A
}

/**
 * 归并排序
 * @param {*} A 
 * @param {*} p 
 * @param {*} r  
 */
function mergeSort(A, p, r) {
  if (r - p === 1) {
    return
  }
  const q = divide(p, r)
  mergeSort(A, p, q)
  mergeSort(A, q, r)

  merge(A, p, q, r)

  return A
}

/******* 验证 **********/
const { assert } = require('chai')

// assert.equal(divide(0, 5), 2)
// assert.equal(divide(2, 5), 3)

// assert.deepEqual(
//   merge([2, 10, 3, 7], 0, 2, 4),
//   [2, 3, 7, 10],
//   'error 2'
// )

assert.deepEqual(
  mergeSort([10, 3, 3, 100], 0, 4),
  [3, 3, 10 ,100]
)