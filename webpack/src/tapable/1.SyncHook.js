/**
 * SyncHook: 不关心监听函数的返回值
 */

// const { SyncHook } = require("tapable");

// 实例化时传入的参数个数可以是多个，与监听函数的参数对应
// let queue = new SyncHook(['name']);

// // 订阅
// // tap 的第一个参数是用来标识订阅的函数的
// queue.tap('1', function (name, name2) {
//   console.log(name, name2, 1); //-> webpack1 undefined 1, 因为new SyncHook只传了一个参数，所以name2接受不到webpack-cli2这个值
//   // return '1'
// });
// queue.tap('2', function (name) {
//   console.log(name, 2);
// });
// queue.tap('3', function (name) {
//   console.log(name, 3);
// });

// // 发布
// queue.call('webpack1', 'webpack-cli2');

/**
 * 输出：
 * webpack1 webpack-cli2 1
 * webpack1 2
 * webpack1 3
 */

// 原理实现-------------------------------------------------

class _SyncHook {
	constructor(args) {
		this.args = args;
		this.tasks = [];
	}

	tap(name, fn) {
		this.tasks.push(fn);
	}

	call(...args) {
    let arr = args.slice(0, this.args.length)
    this.tasks.forEach(task=>task(...arr))
  }
}

let queue = new _SyncHook(['name']);

queue.tap('1', function (name, name2) {
  console.log(name, name2, 1); 
  // return '1'
});
queue.tap('2', function (name) {
  console.log(name, 2);
});
queue.tap('3', function (name) {
  console.log(name, 3);
});

queue.call('webpack1', 'webpack-cli2');