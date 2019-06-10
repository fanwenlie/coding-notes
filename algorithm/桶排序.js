
/**
 * 桶排序不是一个优秀的排序算法
 * 桶排序有很大的缺点，你需要考虑很多的边界条件
 * 比如[1, 9999]，你不可能去创建一个10000长度的数据去存放两个数字，这时候就需要优化
 * */
function bucketSort(Arr) {
  const len = Arr.length;

  const B = [...Array(len)].map(v => [])

  const indexFn = (val) => {
    return val - 1
  }

  Arr.forEach(item => {
    B[indexFn(item)].push(item)
  })

  // filter复杂度：O(n)
  // concat复杂度：O(n)
  // return B
  // 其实可以省略 filter
  // .filter(bucket => {
  //   return bucket.length > 0
  // })
  // .reduce((result, bucket) => {
  //   return result.concat(bucket)
  // }, [])

  // 最推荐的方式
  // 如果B为二维数组[[1,2], [3, 4]], 会直接变成[1, 2, 3, 4]
  // 但是三维数组并不会扩展成一维的
  return [].concat(...B)
}

console.log(bucketSort([1, 3, 5, 4, 3, 2, 1, 1]));
