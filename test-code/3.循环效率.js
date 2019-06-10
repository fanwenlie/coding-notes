const arr = new Array(100000).fill({ name: 'fwl' });
function handle(value) {
	return value * 2;
}

console.time('for');
for (let i = 0; i < arr.length; i++) {
	const ele = arr[i];
	handle(ele);
}
console.timeEnd('for');

console.time('for1');
for (let i = arr.length - 1; i >= 0; i--) {
	const ele = arr[i];
	handle(ele);
}
console.timeEnd('for1');

console.time('do-while');
let i = arr.length - 1;
if (i > -1) {
	do {
		const ele = arr[i];
		handle(ele);
		--i;
	} while (i >= 0);
}
console.timeEnd('do-while');

/**
 * 上面三种方式初次加载时间是有区别的，do-while效率最高。
 * 多次刷新页面之后，时间发生变化, 但基本上do-while执行时间最短
 * 
 * */
