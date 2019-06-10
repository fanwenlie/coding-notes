/*
 * 快速排序:
 *   1 每次获取一个中间位置的值
 *   2 用刚刚拿出来的这个值循环和原有数组中的每一项比较，把比中间项小的放在左面，比中间项大的放在右面
 *   3 然后每次分裂的在继续执行此操作，一直到分裂的项目没有为止
 * 
 * 时间复杂度：O(NlogN)
 *
 * */

function quickSrot(arr) {
  // 每次在利用递归的时候，一定要记得递归结束的条件
	if (arr.length <= 1) {
		return arr;
  }
  
	const midIdx = Math.floor(arr.length / 2);

	const middleItem = arr.splice(midIdx, 1)[0]; 

	const left = []; 
	const right = []; 
	for (let i = 0; i < arr.length; i++) {
		arr[i] > middleItem ? right.push(arr[i]) : left.push(arr[i]);
	}

	return quickSrot(left).concat(middleItem, quickSrot(right));
}


console.log(quickSrot([5, 4, 2, 1, 3, 5, 6, 7, 8, 9, 0]));
