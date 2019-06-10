/**
 * 冒泡排序：每一轮相邻的两项两两比较，如果如果前一向大于后一项，那么就交换位置，当这一轮执行结束的时候，这一轮里的最大值已经放到了最后
 * 时间复杂度O(n^2).
 * @param {Array} arr 
 */

function bubbleSort(arr) {
  const len = arr.length - 1;
  for (let i = 0; i < len; i++) {

    // 优化: arr = [0, 4, 3, 2, 1]
    //i=0   第一轮  4次    5-1-0  ary.length-1-i
    //i=1   第二轮  3次    5-1-1  ary.length-1-i
    //i=2   第三轮  2次    5-1-2  ary.length-1-i
    //i=3   第四轮  1次    5-1-3  ary.length-1-i

    for (let j = 0; j < len - i; j++) {
      if (arr[j] > arr[j + 1]){
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
      }
    } 
  }

  return arr
}

console.log(bubbleSort([0, 4, 3, 2, 1]))