/**
 * 使用generator来写递归有个好处：
 * 1. 就是循环可控，比如我想要第四项，只要运行四次就行了。这样性能上得到了比较好的优化
 *  假如我们有100w数据，如果我们只要中间的一项，总不能循环100w次，再去找中间项
 * 
 * 2. 不需要return值了
 *  就像下面的扁平数据方法，正常情况你需要return一个数组
 * 
 * 用扁平数据来举例
 */

function* flattern(arr) {
	for (let i = 0; i < arr.length; i++) {
		const item = arr[i];
		if (Array.isArray(item)) {
			yield* flattern(item);
		} else {
			yield item;
		}
	}
}

const genArr = flattern( [1, 2, 3, [1, 2, 3, [444, 6]] ] );

// console.log( [...genArr] )


console.log(genArr.next())
console.log(genArr.next())
console.log(genArr.next())
console.log(genArr.next())