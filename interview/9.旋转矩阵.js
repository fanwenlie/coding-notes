
/**
 * [leetcode](https://leetcode-cn.com/problems/rotate-matrix-lcci/)
 * 给你一幅由 N × N 矩阵表示的图像，其中每个像素的大小为 4 字节。请你设计一种算法，将图像旋转 90 度。
 * 
 * 不占用额外内存空间能否做到？
 * 
 * 给定 matrix = [
 *  [1,2,3],
 *  [4,5,6],
 *  [7,8,9],
 * ]
 * 原地旋转输入矩阵，使其变为:
 * [
 *  [7,4,1],
 *  [8,5,2],
 *  [9,6,3],
 * ]
 * 
 * 解题思路：先翻转矩阵，再交换索引，索引交换是有规律的
 * reverse之后为：
  * [
  *  [7,8,9],
  *  [4,5,6],
  *  [1,2,3],
  * ]
  * 
  * 规律：
  * 第一次循环次数：
  * [0, 0] -> [0, 0]
  * [0, 1] -> [1, 0]
  * [0, 2] -> [2, 0]
  * 
  * 第二次循环：只交换了[1, 2] -> [2, 1]
  * [1, 0] -> [0, 1] // 第一次循环已经交换了，不需要交换了
  * [1, 1] -> [1, 1] // 原地不需要交换
  * [1, 2] -> [2, 1]
  * 
  * 没有第三次循环，都已经交换过了
  * [2, 0] -> [0, 2]
  * [2, 1] -> [1, 2]
  * [2, 2] -> [2, 2]
 * 
 * 
 * @param {Array} matrix 二维数组
 */
function rotateMatrix(matrix) {
  matrix.reverse()
  const len = matrix.length
  for (let i = 0; i < len; i++) {
    // 这里i + 1, 是因为已经交换过的不需要再交换了
    for (let j = i + 1; j < len; j++) {
      // const temp = matrix[i][j]
      // matrix[i][j] = matrix[j][i]
      // matrix[j][i] = temp
      [matrix[j][i], matrix[i][j]] = [matrix[i][j], matrix[j][i]]
    }
  }
  return matrix
}

const m = rotateMatrix([
  [1,2,3],
  [4,5,6],
  [7,8,9],
])

console.log(m)