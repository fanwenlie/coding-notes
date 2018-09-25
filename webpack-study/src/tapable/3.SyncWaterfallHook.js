/**
 * 上一个监听函数的返回值可以传给下一个监听函数
 */

const {
	SyncWaterfallHook
} = require("tapable");

let queue = new SyncWaterfallHook(['name']);

// 上一个函数的返回值可以传给下一个函数
queue.tap('1', function (name) {
	console.log(name, 1);
	return 'a';
});
queue.tap('2', function (data) {
	console.log(data, 2);
	return 'b';
});
queue.tap('3', function (data) {
	console.log(data, 3);
});

queue.call('webpack');

/** 输出
 * webpack 1
 * a 2
 * b 3
 */

// 原理实现-------------------------------------------------

class _SyncWaterfallHook {
	constructor(args) {
		this.args = args;
		this.tasks = [];
	}

	// 订阅
	tap(name, fn) {
		this.tasks.push(fn);
	}

	// 发布
	call(...args) {
		let arr = args.slice(0, this.args.length);
		let temp;
		for (let i = 0, l = this.tasks.length; i < l; i++) {
			let task = this.tasks[i];
			if(i===0){
				temp = task(...arr);
			} else {
				temp = task(temp)
			}
		}
	}
}
