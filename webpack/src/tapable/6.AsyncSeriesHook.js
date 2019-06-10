/**
 * 异步串行 不关心监听函数的返回值
 */

const {
	AsyncSeriesHook
} = require("tapable");

// let queue1 = new AsyncSeriesHook(['name']);
// console.time('cost1');
// queue1.tapAsync('1', function (name, cb) {
// 	console.log(name, 1);
// 	cb()
// 	return "Wrong";
// });
// queue1.tapAsync('2', function (name, cb) {
// 	console.log(name, 2);
// 	cb()
// });
// queue1.tapAsync('3', function (name, cb) {
// 	console.log(name, 3);
// 	cb()
// });
// queue1.callAsync('start', err => {
// 	console.log(err);
// 	console.timeEnd('cost1');
// });

// 原理实现-------------------------------------------------

// 个人理解：异步串行和异步并行有点像await/async 和 Promise.all([])
// 异步串行：await执行之后才能执行下一个await
// 异步并行：多个异步代码一起执行
// 以下代码实现并不严谨，有诸多问题
class _AsyncSeriesHook {
	constructor() {
		this.tasks = [];
	}

	// 订阅
	tapAsync(name, fn) {
		this.tasks.push(fn);
	}
	
	tapPromise(name, fn) {
		this.tasks.push(fn);
	}
	// 发布
	callAsync(...args) {
		const finalCallBck = args.pop();
		let count = 0;
		let arrFn = this.tasks;
		// next有点像koa中间件中的控制转移，只有使用next之后再能执行下一个监听函数
		let next = (err) => {
			if(++count > arrFn.length || err){
				finalCallBck(err)
				return;
			}
			arrFn[count-1](...args, next)
			
		}
		next()
	}
	
	
	promise(...args) {
		let [first, ...other] = this.tasks;
		// 使用reduce+promise来实现异步串行
		return other.reduce((promise, task)=>{
			return promise.then(()=>task(...args))
		}, first(...args))
	}
}

let queue3 = new _AsyncSeriesHook(["name"]);
console.time("cost3");
queue3.tapPromise("1", function(name) {
	return new Promise(function(resolve, reject) {
		setTimeout(() => {
			console.log(name, 1);
			resolve();
		}, 1000);
	});
});

queue3.tapPromise("1", function(name) {
	return new Promise(function(resolve, reject) {
		setTimeout(() => {
			console.log(name, 2);
			resolve();
		}, 900);
	});
});

queue3.tapPromise("1", function(name) {
	return new Promise(function(resolve, reject) {
		setTimeout(() => {
			console.log(name, 3);
			resolve();
		}, 800);
	});
});

queue3.promise("tapPromise").then(
	() => {
		console.log("over");
		console.timeEnd("cost3");
	},
	() => {
		console.log("error");
		console.timeEnd("cost3");
	}
);
