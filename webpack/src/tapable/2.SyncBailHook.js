/**
 * 只要有一个监听函数的返回值为除 undefined 的所有其他类型，都会跳过剩下的监听函数
 */

// const {
//   SyncBailHook
// } = require("tapable");

// let queue = new SyncBailHook(['name']);

// queue.tap('1', function (name) {
//   console.log(name, 1);
//   return undefined
// });
// queue.tap('2', function (name) {
//   console.log(name, 2);
//   return null
//   // return ''
//   // return []
//   // return {}
//   // return function(){}
//   // return false
//   // return true

// });
// queue.tap('3', function (name) {
//   console.log(name, 3);
// });

// queue.call('webpack');

// 原理实现-------------------------------------------------

class _SyncBailHook {
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
    let arr = args.slice(0, this.args.length)
		for (let i = 0, l = this.tasks.length; i < l; i++) {
			let task = this.tasks[i];
			let result = task(...arr);
			if (typeof result !== "undefined") {
				break;
			}
		}
	}
}
