/**
 * 通过斐波那契数列去探索尾递归以及优化
 * 斐波那契数列公式：f(n) = f(n - 1) + f(n - 2), (条件n >= 3). f(1) = 1, f(2) = 1;
 * 算法书中说到：理论上来说任何需要递归的函数都可以转换成迭代的方式执行
 */
'use strict';

// console.time('递归');
// function fibA(n) {
// 	if (n === 1 || n === 2) {
// 		return 1;
// 	}

// 	return fibA(n - 1) + fibA(n - 2);
// }
// fibA(50)
// console.timeEnd('递归');

console.time('尾递归');
function fibB(n, a = 1, b = 1) {
	if (n === 1) {
		return a;
	}
	if (n === 2) {
		return b;
	}
	// let res = fibB(n - 1, b, a + b);
	// return res
	return fibB(n - 1, b, a + b);
}
console.log(fibB(1000));
console.timeEnd('尾递归');

/**
 * 动态规划
 */
console.time('递归改成for循环');
function fibFor(n) {
	let a = 1;
	let b = 1;

	// 普通循环
	let res = 0;
	for (let i = 3; i <= n; i++) {
		res = a + b;
		a = b;
		b = res;
	}

	// if (res > Number.MAX_SAFE_INTEGER) {
	//   throw new Error(`斐波那契数列第${n}项：已经超过JS最大安全整数`)
	// }

	return res;
}
console.log(fibFor(1000));
console.timeEnd('递归改成for循环');

console.time('递归改成while循环');
function fibWhile(n) {
	let a = 1;
	let b = 1;

	let res = 0;
	while (n >= 3) {
		// 有趣的是：用es6的语法很简洁，但是执行时间增加了0.2ms左右
		// [a, b] = [b, a + b]
		res = a + b;
		a = b;
		b = res;

		n--;
	}
	return res;
}
console.log(fibWhile(1000));
console.timeEnd('递归改成while循环');

/***************** 尾递归优化 搞不明白 **********************/
// 蹦床函数
const trampoline = f => (...args) => {
	let result = f(...args);
	while (typeof result === 'function') {
		result = result();
	}
	return result;
};

console.time('尾递归优化');
const optimizeFibB = (n, a = 1, b = 1) => {
	if (n === 1) {
		return a;
	}
	if (n === 2) {
		return b;
	}
	return () => optimizeFibB(n - 1, b, a + b);
};
const optmFib = trampoline(optimizeFibB);
console.log(optmFib(1000));
console.timeEnd('尾递归优化');

/**
 * 最优算法，直接通过数学公式算斐波那契数列
 */
console.time('最优');
function zfib(n) {
	const G = Math.sqrt(5) * 0.5 + 0.5;
	return Math.round((Math.pow(G, n) - Math.pow(1 - G, n)) / Math.sqrt(5));
}
zfib(1000);
console.timeEnd('最优');
