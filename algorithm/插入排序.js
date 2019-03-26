/**
 * 插入排序：
 * 可以用玩牌来形容，我先选第一张牌A作为基准.
 * 如果第二张牌比第一张牌大，则放在A的右边；
 * 如果第二张牌比第一张牌小，则放在A的左边；
 * 不断循环比较，直到抓完牌才结束
 * 
 * 时间复杂度： O(N^2)
 */


function insertSort(arr) {
	var newArr = [];
	newArr.push(arr[0]); 
	for (var i = 1; i < arr.length; i++) {
	
		var curItem = arr[i]; 
		for (var j = newArr.length - 1; j >= 0; ) {
			
			if (curItem < newArr[j]) {
				
				j--; 
				if (j === -1) {
					
					newArr.unshift(curItem);
				}
			} else {

				newArr.splice(j + 1, 0, curItem); 
				//break;
				j = -1; 
			}
		}
	}
	return newArr;
}

console.log(insertSort([5, 2, 1, 4, 3]));
