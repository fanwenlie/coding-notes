/**
 * 给定一个m*n的矩阵，请按照顺时针方向输出：[1,2,3,6,9,8,7,4,5]
 * [
 *   [1,2,3],
 *   [4,5,6],
 *   [7,8,9]
 * ]
 *
 * 如果是4 * 3的矩阵, 应该输出：[1, 2, 3, 6, 9, 12, 11, 10, 7, 4, 5, 8]
 * [
 *   [1,2,3],
 *   [4,5,6],
 *   [7,8,9],
 *   [10,11,12],
 * ]
 * 
 * 解题思路：
 * 1. 通过按照顺时针方向，不断变换索引来输出值。需要四个指针来记录当前的索引位置
 * 2. 会有四个方向，先→, 然后↓, 在然后←，最后↑
 * 3. 当四个方向的值读取完毕，对比当前输出的数组 === (m * n), 如果不相等，就继续重复步骤2
 */

function outputMatrix(matrix) {
  let res = []
  if (!matrix.length) return res
  let xLen = matrix[0].length
  let yLen = matrix.length
  const totalLen = xLen * yLen
  // 四个指针
  let right = xLen - 1
  let bottom = yLen - 1
  let left = 0
  let top = 0
  while (res.length !== totalLen) {
    for (let i = left; i <= right; i++) {
      res.push(matrix[top][i])
    }
    console.log(res, '→')
    if (res.length === totalLen) break

    top++
    for (let i = top; i <= bottom; i++) {
      res.push(matrix[i][right])
    }
    console.log(res, '↓')
    if (res.length === totalLen) break

    right--
    for (let i = right; i >= left; i--) {
      res.push(matrix[bottom][i])
    }
    console.log(res, '←')
    if (res.length === totalLen) break

    bottom--
    for (let i = bottom; i >= top; i--) {
      res.push(matrix[i][left])
    }
    console.log(res, '↑')
    if (res.length === totalLen) break
    left++
  }
  return res
}

console.log(
  outputMatrix([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [10, 11, 12],
  ])
)
