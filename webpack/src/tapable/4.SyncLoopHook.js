/**
 * 当监听函数被触发的时候，如果该监听函数返回true时则这个监听函数会反复执行，如果返回 undefined 则表示退出循环
 */

const { SyncLoopHook } = require("tapable");

// let queue = new SyncLoopHook(["name"]);

// let count = 3;
// queue.tap("1", function(name) {
// 	console.log("count: ", count--);
// 	if (count > 1) {
// 		return true;
// 	}
// 	return;
// });

// let num = 3
// queue.tap('2', function (name) {
// 	console.log('num: ', num--);
// 	if (num > 0) {
// 			return true;
// 	}
// 	return;
// });

// queue.call('webpack');

/** 输出
 * count 3
 * count 2
 */

/**
 * 注意同时有两个以上函数都订阅了SyncLoopHook，都存在返回true时的输出情况
 * 当第二个函数返回true时会从第一个函数重新执行
 */

/** 输出
 * count:  3
 * count:  2
 * num:  3
 * count:  1
 * num:  2
 * count:  0
 * num:  1
 */

// 原理实现-------------------------------------------------

class _SyncLoopHook {
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
		for (let i = 0, l = this.tasks.length; i < l; i++) {
			let task = this.tasks[i];
			let res;
			do {
				res = task(...arr);
				// 只有当有多个监听函数时，才触发i=0从头再次循环执行
				if(res && i !== 0) {
					i = -1;
					break
				}
			} while (res);
		}
	}
}

let queue = new _SyncLoopHook(["name"]);

let count = 3;
queue.tap("1", function(name) {
	console.log("count: ", count--);
	if (count > 1) {
		return true;
	}
	return;
});

let num = 3
queue.tap('2', function (name) {
	console.log('num: ', num--);
	if (num > 0) {
			return true;
	}
	return;
});

queue.call('start')