/**
 * 希尔排序是改进的插入排序算法。不稳定 最坏O(n^2) 最好O(nlogn)
 * 
 * 核心思想是通过较大的步长（gap）进行分组和排序，然后逐渐缩小步长，直到最后一次使用增量为 1 的插入排序完成整个数组的排序。
 * 这样的分组和排序操作可以减少数组中逆序对的数量，从而提高排序效率。
 */
function shellSort(arr) {
  const len = arr.length;
  let gap = Math.floor(len / 2); // 初始增量设置为数组长度的一半

  while (gap > 0) {
    // 根据增量进行分组，对每个子序列进行插入排序
    for (let i = gap; i < len; i++) {
      const current = arr[i];
      let j = i;

      // 在当前分组中进行插入排序
      while (j >= gap && arr[j - gap] > current) {
        arr[j] = arr[j - gap];
        j -= gap;
      }

      arr[j] = current;
    }

    gap = Math.floor(gap / 2); // 缩小增量
  }

  return arr;
}

const array = [8, 9, 1, 7, 2, 3, 5, 4, 6, 0];
const sortedArray = shellSort(array);
console.log(sortedArray);