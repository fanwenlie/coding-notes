/*
 * 快速排序:
 *   1 每次获取一个中间位置的值
 *   2 用刚刚拿出来的这个值循环和原有数组中的每一项比较，把比中间项小的放在左面，比中间项大的放在右面
 *   3 然后每次分裂的在继续执行此操作，一直到分裂的项目没有为止
 *
 * 时间复杂度：O(NlogN)
 *
 * */

/**
 * 缺点：非最优. 不是原地排序，会造成过多的内存消耗，且不稳定，排序效率较低。
 * @param {*} arr 
 * @returns 
 */
function quickSort(arr) {
  // 每次在利用递归的时候，一定要记得递归结束的条件
  if (arr.length <= 1) {
    return arr
  }

  const midIdx = Math.floor(arr.length / 2)

  const middleItem = arr.splice(midIdx, 1)[0]

  const left = []
  const right = []
  for (let i = 0; i < arr.length; i++) {
    arr[i] > middleItem ? right.push(arr[i]) : left.push(arr[i])
  }

  return quickSort(left).concat(middleItem, quickSort(right))
}

const testArr = [5, 4, 2, 1, 3, 5, 6, 7, 8, 9, 0]
// console.log(quickSort(testArr));

/**
 * 三路快排
 * 1. 如果当前i指向的元素等于p，则i+1
 * 2. 如果当前i指向的元素小于p，则将lt+1处的元素与索引i处的值进行交换，然后lt+1,并且i+1
 * 3. 如果当前i指向的元素大于p，则将gt-1处的元素与索引i处的值进行交换，然后gt-1
 * 4. 最后当i走到gt处时，即gt==i时；那就说明，除了第一个元素之外，其余的空间已经分区完毕，只要将首个元素与lt处的元素进行交换，然后lt-1；我们就形成了想要的三个区间，小于p，等于p，大于p
 * @param {*} arr 
 */
function bestQuickSort(arr) {
  const values = [...arr]

  const quickSort = (arr, L, R) => {
    const swap = (arr, idx1, idx2) => {
      if (idx1 === idx2) { return }
      const temp = arr[idx1]
      arr[idx1] = arr[idx2]
      arr[idx2] = temp
    };
  
    const partition = function (arr, L, R) {
      // 基准值为数组的零号元素
      let p = arr[L]
      // 左区间的初始值: L
      let lt = L
      // 右区间的初始值: R+1
      let gt = R + 1
      for (let i = L + 1; i < gt; ) {
        if (arr[i] === p) {
          // 当前i指向的元素等于p
          i++
        } else if (arr[i] > p) {
          // 当前i指向的元素大于p，将gt-1处的元素与当前索引处的元素交换位置，gt--
          swap(arr, i, gt - 1)
          gt--
        } else {
          // 当前i指向的元素小于p，将lt+1处的元素与当前索引处的元素交换位置，lt+1，i+1
          swap(arr, i, lt + 1)
          lt++
          i++
        }
      }
    
      // i走向gt处，除了基准值外的元素，其余的空间已经分区完毕，交换基准值与lt处的元素，lt-1，最终得到我们需要的三个区间
      swap(arr, lt, L)
      lt--
      
      // console.log(`三路快排后的数组: ${arr}`)
      return { lt, gt }
    }
    
    if (L >= R) { return }
  
    const { lt, gt } = partition(arr, L, R)
  
    quickSort(arr, L, lt)
    quickSort(arr, gt, R)
  }

  quickSort(values, 0, values.length - 1)

  return values

}

console.log(bestQuickSort(testArr))
