/**
 * 选择排序: 每次从未排序的部分中选择最小（或最大）的元素，然后将其放到已排序部分的末尾。通过不断重复这个过程，直到所有元素都被排序。
 * 时间复杂度 O(n^2)
 */
function selectionSort(arr) {
  let len = arr.length;

  // 只需要 n-1 次迭代
  for (let i = 0; i < len - 1; i++) {
    let minIdx = i;

    // 在未排序部分中找到最小元素的索引
    for (let j = i + 1; j < len; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j
      }
    }

    // 将最小元素与未排序部分的第一个元素交换位置
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]]
    }
  }

  return arr
}

const array = [8, 9, 1, 7, 2, 3, 5, 4, 6, 0];
const sortedArray = selectionSort(array);
console.log(sortedArray);