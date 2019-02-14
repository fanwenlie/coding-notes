/**
 * 不关心监听函数的返回值
 * 关于series和parallel的js实现可以参考 https://github.com/caolan/nimble/blob/master/nimble.js
 */

const { AsyncParallelHook } = require("tapable");

//------ tap callAsync
// let queue1 = new AsyncParallelHook(["name"]);
// console.time("cost");
// queue1.tap("1", function(name) {
// 	console.log(name, 1);
// });
// queue1.tap("2", function(name) {
// 	console.log(name, 2);
// });
// queue1.tap("3", function(name) {
// 	console.log(name, 3);
// });
// queue1.tapAsync("4", function(name, cb) {
// 	setTimeout(() => {
// 		console.log(name, 4);
// 		cb();
// 	}, 1000);
// });
// queue1.tapAsync("5", function(name, cb) {
// 	setTimeout(() => {
// 		console.log(name, 5);
// 		cb();
// 	}, 2000);
// });
// queue1.tapAsync("6", function(name, cb) {
// 	setTimeout(() => {
// 		console.log(name, 6);
// 		cb();
// 	}, 3000);
// });

// queue1.tapPromise("7", function(name, cb) {
// 	return new Promise(function(resolve, reject) {
// 		setTimeout(() => {
// 			console.log(name, 7);
// 			resolve();
// 		}, 1000);
// 	});
// });

// queue1.tapPromise("8", function(name, cb) {
// 	return new Promise(function(resolve, reject) {
// 		setTimeout(() => {
// 			console.log(name, 8);
// 			resolve();
// 		}, 2000);
// 	});
// });

// queue1.tapPromise("9", function(name, cb) {
// 	return new Promise(function(resolve, reject) {
// 		setTimeout(() => {
// 			console.log(name, 9);
// 			resolve();
// 		}, 3000);
// 	});
// });

// queue1.callAsync("tap", err => {
// 	console.timeEnd("cost");
// });

// queue1.promise('promise').then(()=>{
// 	console.timeEnd("cost");
// }).catch(()=>{
// 	console.timeEnd("cost");
// })

//-------- tapAsync callAsync
// let queue2 = new AsyncParallelHook(["name"]);
// console.time("cost1");
// queue2.tapAsync("1", function(name, cb) {
// 	setTimeout(() => {
// 		console.log(name, 1);
// 		cb();
// 	}, 1000);
// });
// queue2.tapAsync("2", function(name, cb) {
// 	setTimeout(() => {
// 		console.log(name, 2);
// 		cb();
// 	}, 2000);
// });
// queue2.tapAsync("3", function(name, cb) {
// 	setTimeout(() => {
// 		console.log(name, 3);
// 		cb();
// 	}, 3000);
// });

// queue2.callAsync("tapAsync", () => {
// 	console.log("over");
// 	console.timeEnd("cost1");
// });

// //-------------tapPromise promise
// let queue3 = new AsyncParallelHook(["name"]);
// console.time("cost3");
// queue3.tapPromise("1", function(name, cb) {
// 	return new Promise(function(resolve, reject) {
// 		setTimeout(() => {
// 			console.log(name, 1);
// 			resolve();
// 		}, 1000);
// 	});
// });

// queue3.tapPromise("1", function(name, cb) {
// 	return new Promise(function(resolve, reject) {
// 		setTimeout(() => {
// 			console.log(name, 2);
// 			resolve();
// 		}, 2000);
// 	});
// });

// queue3.tapPromise("1", function(name, cb) {
// 	return new Promise(function(resolve, reject) {
// 		setTimeout(() => {
// 			console.log(name, 3);
// 			resolve();
// 		}, 3000);
// 	});
// });

// queue3.promise("tapPromise").then(
// 	() => {
// 		console.log("over");
// 		console.timeEnd("cost3");
// 	},
// 	() => {
// 		console.log("error");
// 		console.timeEnd("cost3");
// 	}
// );

// 原理实现-------------------------------------------------
// 以下代码实现并不严谨，有诸多问题
class _AsyncParallelHook {
	constructor() {
		this.tasks = [];
		this.asyncTasks = [];
		this.promiseTasks = [];
	}

	// 订阅
	tap(name, fn) {
		this.tasks.push(fn);
	}
	tapAsync(name, fn) {
		this.asyncTasks.push(fn);
	}
	tapPromise(name, fn) {
		this.promiseTasks.push(fn);
	}
	// 发布
	callAsync(...args) {
		let lastCallBack = args.pop()
		let count = 0;
		const done = ()=>{
			if(++count === this.asyncTasks.length) {
				lastCallBack()
				return;
			}
		}

		this.tasks.forEach((task) => task(...args))
		
		this.asyncTasks.forEach((task) => task(...args, done))
		
		// 使用promise.all([])来实现异步并行
		Promise.all(this.promiseTasks.map((task)=>task(...args)))
	}
	promise(...args) {
		// 不知道如何实现
	}
}


// let queue1 = new _AsyncParallelHook(["name"]);
// console.time("cost");
// queue1.tap("1", function(name) {
// 	console.log(name, 1);
// });
// queue1.tap("2", function(name) {
// 	console.log(name, 2);
// });
// queue1.tap("3", function(name) {
// 	console.log(name, 3);
// });
// queue1.tapAsync("4", function(name, cb) {
// 	setTimeout(() => {
// 		console.log(name, 4);
// 		cb();
// 	}, 1000);
// });
// queue1.tapAsync("5", function(name, cb) {
// 	setTimeout(() => {
// 		console.log(name, 5);
// 		cb();
// 	}, 2000);
// });
// queue1.tapAsync("6", function(name, cb) {
// 	setTimeout(() => {
// 		console.log(name, 6);
// 		cb();
// 	}, 3000);
// });

// queue1.tapPromise("7", function(name, cb) {
// 	return new Promise(function(resolve, reject) {
// 		setTimeout(() => {
// 			console.log(name, 7);
// 			resolve();
// 		}, 1000);
// 	});
// });

// queue1.tapPromise("8", function(name, cb) {
// 	return new Promise(function(resolve, reject) {
// 		setTimeout(() => {
// 			console.log(name, 8);
// 			resolve();
// 		}, 2000);
// 	});
// });

// queue1.tapPromise("9", function(name, cb) {
// 	return new Promise(function(resolve, reject) {
// 		setTimeout(() => {
// 			console.log(name, 9);
// 			resolve();
// 		}, 3000);
// 	});
// });

// queue1.callAsync("tap", err => {
// 	console.log('game over')
// 	console.timeEnd("cost");
// });