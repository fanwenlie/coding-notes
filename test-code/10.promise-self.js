/**
 * [剖析Promise内部结构，一步一步实现一个完整的、能通过所有Test case的Promise类](https://github.com/xieranmaya/blog/issues/3)
 * [A Very Fast Javascript thread yield](https://gist.github.com/bluejava/9b9542d1da2a164d0456)
 * 
 * Promise/A+规范译文:
 * https://malcolmyu.github.io/2015/06/12/Promises-A-Plus/#note-4
 */
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

/**
 * 
 * @param {Promise} promise2 
 * @param {*} x 普通值, promise对象, thenable对象/函数
 * @param {Function} resolve 
 * @param {Function} reject 
 */
function resolvePromise(promise2, x, resolve, reject) {
	// NOTE:这段代码为什么不起作用
	if (promise2 === x) {
		return reject(new TypeError('Chaining cycle detected for promise!'));
	}

	if (x instanceof Promise) {
		if (x.status === PENDING) {
			x.then(
        val => {
          resolvePromise(promise2, val, resolve, reject);
        }, 
        reason => {
					reject(reason);
				},
      );
		} else {
			x.then(resolve, reject);
		}
		return;
	}

	// NOTE:不知道为啥要加这个
	let thenCalledOrThrow = false;
	if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
		try {
			let then = x.then;
			if (typeof then === 'function') {
				then.call(
					x,
					y => {
						if (thenCalledOrThrow) {
							return;
						}
						thenCalledOrThrow = true;
						resolvePromise(promise2, y, resolve, reject);
					},
					r => {
						if (thenCalledOrThrow) {
							return;
						}
						thenCalledOrThrow = true;
						reject(r);
					},
				);
			} else {
				resolve(x);
			}
		} catch (e) {
			if (thenCalledOrThrow) {
				return;
			}
			thenCalledOrThrow = true;
			reject(e);
		}
	} else {
		resolve(x);
	}
}

/**
 * 异步包装函数
 */
const asyncFn = (function () {
	if (typeof window !== 'undefined') {
		// Firefox和Chrome早期版本中带有前缀
		const MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
		if (typeof MutationObserver !== 'undefined') {
			const callbacks = []
			const dd = document.createElement('div')
			const mo = new MutationObserver((mutationsList) => {
				while (callbacks.length) {
					const cb = callbacks.shift()
					cb.call(null)
				}
			})
			mo.observe(dd, { attributes: true });

			return fn => {
				callbacks.push(fn)
				// MutationObserver特性：即使上次插入的属性值和当前插入的属性值相同，传给MutationObserver的回调函数依旧会被调用
				dd.setAttribute('a', 0)
		  }
		}
	}

	// 放第二个判断，避免browserify自动导入process.nextTick来覆盖浏览器实现。
	if (typeof process !== 'undefined' && process.nextTick) {
			return process.nextTick;
	}

	//上面两种都会在当前执行栈末尾回调。下面两个会在下个事件循环才执行，属于Plan B。
	if (typeof setImmediate === 'function') {
			return setImmediate;
	}

	return fn => setTimeout(fn, 0)
})()

class Promise {
	constructor(executor) {
		const self = this;

		// Promise初始状态
		self.status = PENDING;
		// fulfilled状态时 返回的信息
		self.value = undefined;
		// rejected状态时 拒绝的原因
		self.reason = undefined;
		// Promise resolve时的回调函数集，因为在pending阶段, 有可能有多个回调添加到它上面
		self.onFulfilledCallbacks = [];
		// 原因同上
		self.onRejectedCallbacks = [];

		// resolve和reject方法定义在constructor中是没问题的
		// 这样resolve和reject就默认绑定了this
		function resolve(value) {
			if (value instanceof Promise) {
				return value.then(resolve, reject);
			}

			/**
			 * 根据Promise/A+标准,要确保 onFulfilled 和 onRejected 方法异步执行
			 */
			asyncFn(() => {
				if (self.status === PENDING) {
					self.status = FULFILLED;
					self.value = value;
					self.onFulfilledCallbacks.forEach(cb => cb(self.value));
				}
			})
		}
		function reject(reason) {
			asyncFn(() => {
				if (self.status === PENDING) {
					self.status = REJECTED;
					self.reason = reason;
					self.onRejectedCallbacks.forEach(cb => cb(self.reason));
				}
			})
		}

		try {
			// 考虑到执行executor的过程中有可能出错，所以我们用try/catch块给包起来，
			// 并且在出错后以catch的值reject掉这个Promise
			executor(resolve, reject);
		} catch (e) {
			reject(e);
		}
	}

	/**
	 * 
	 * @param {?Function} onFulfilled 
	 * @param {?Function} onRejected 
	 */
	then(onFulfilled, onRejected) {
		const self = this;
		let promise2;

		/**
		 * 根据Promise/A+标准，如果then的参数不是function，则我们需要忽略它。
		 * 我们这里分别定义两个默认函数
		 * 解决穿透问题：
		 * 比如new Promise(resolve => resolve(1)).then().then().then(val => console.log(val))
		 * 我们在最后一个then中接收value，要实现这个功能，我们提供一个默认函数：
		 * resolved则return value
		 * rejected则 throw reason
		 * */ 
		onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
		onRejected =
			typeof onRejected === 'function'
				? onRejected
				: reason => {
						throw reason;
				  };
		/**
		 * 我们都知道then是需要异步执行的
		 * 
		 */
		if (self.status === FULFILLED) {
			return promise2 = new Promise((resolve, reject) => {
				asyncFn(() => {
					try {
						let x = onFulfilled(self.value);
						resolvePromise(promise2, x, resolve, reject);
					} catch (e) {
						reject(e);
					}
				})
			});
		}
		if (self.status === REJECTED) {
			return promise2 = new Promise((resolve, reject) => {
				asyncFn(() => {
					try {
						let x = onRejected(self.reason);
						resolvePromise(promise2, x, resolve, reject);
					} catch (e) {
						reject(e);
					}
				})
			});
		}
		if (self.status === PENDING) {
			return promise2 = new Promise((resolve, reject) => {
				self.onFulfilledCallbacks.push(value => {
					try {
						const x = onFulfilled(value);
						resolvePromise(promise2, x, resolve, reject);
					} catch (e) {
						reject(e);
					}
				});
				self.onRejectedCallbacks.push(reason => {
					try {
						const x = onRejected(reason);
						resolvePromise(promise2, x, resolve, reject);
					} catch (e) {
						reject(e);
					}
				});
			});
		}
	}

	catch(onRejected) {
		return this.then(null, onRejected);
	}

	static resolve(value) {
		return new Promise(resolve => {
			resolve(value)
		})
	}

	static reject(reason) {
		return new Promise((_, reject) => {
			reject(reason)
		})
	}

	/**
	 * promises都resolve的时候，all才会resolve
	 * @param {Array<Promise>} promises 
	 * @return {Promise}
	 */
	static all(promises) {
		return new Promise((resolve, reject) => {
			let count = 0
			let values = []
			let promisesLen = promises.length
			promises.forEach((promise, idx) => {
				promise.then(value => {
					values[idx] = value
					count++
					if (count === promisesLen) {
						resolve(values)
					}
				} , reject)
			})
		})
	}

	static race(promises) {
		return new Promise((resolve, reject) => {
			promises.forEach((promise, idx) => {
				promise.then(resolve, reject)
			})
		})
	}
	
	/**
	 * 暴露出Promise.deferred方法
	 * 供测试脚本[promises-aplus-tests]测试
	 * 
	 * Promise/A+规范测试: 
	 * npm i -g promises-aplus-tests
	 * promises-aplus-tests Promise.js
	 */
	static deferred() {
		const dfd = {};
		dfd.promise = new Promise(function(resolve, reject) {
			dfd.resolve = resolve;
			dfd.reject = reject;
		});
		return dfd;
	}
}

try {
	module.exports = Promise;
} catch (e) {}



