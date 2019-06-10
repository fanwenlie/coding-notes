/**
 * 发布订阅模式：
 * 1. 需要一个调度中心。
 * 2. 发布者发布一个事件，订阅者订阅发布的事件
 * 3. 通过调度中心去执行订阅函数。订阅者和发布者解耦
 */

class Event {
	constructor() {
		this._event = {}; 
  }
  
  // 订阅
	on(type, callback) {
		if (!this._event[type]) {
			this._event[type] = [];
		}
		this._event[type].push(callback);
  }
  
  // 发布
	emit(type, ...params) {
		if (!this._event[type]) {
			return;
		}
		this._event[type].forEach(fn => {
			fn.apply(this, params);
		});
  }
  
	off(type, callback) {
		if (!this._event[type]) {
			return;
		}
		this._event[type].filter(cb => {
			// cb.fn !== callback 用来识别once方法中的off
			return cb !== callback || cb.fn !== callback;
		});
  }
  
	once(type, callback) {
		const tempFn = () => {
			callback.apply(this, arguments);
			this.off(type, callback);
		};
		// 由于on方法绑定的是tempFn, off的时候肯定满足不了fn===callback的判定
		// 所以需要再tempFn上添加一个属性来标识要off的函数
		tempFn.fn = callback;
		this.on(type, tempFn);
	}
}

// 调度中心：所有的订阅和发布都通过它来操作
const evt = new Event()

evt.on('hello', () => {
	console.log('hello! 张三')
})

evt.on('hello', () => {
	console.log('hello! 李四')
})

evt.emit('hello')