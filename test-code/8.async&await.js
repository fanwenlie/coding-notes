
/**
 * async/await函数: 直观看最大的好处就是用同步的写法写异步，完美避过了回调地狱、promise各种then的问题。
 * 代码可读性更强。
 * 
 * async/await函数其实是generator的语法糖,
 * 语义比yield/*更好；
 * 内置自动执行器，不像generator需要自己写for-of循环去执行
 * 
 * 简单模拟async/await函数[阮一峰版本]
 */

/**
  * @return {Promise}
  */
function _co(genFn) {
  return new Promise((resolve, reject) => {
    const gen = genFn();
    function step(nextF) {
      let next;
      try {
        next = nextF();
      } catch (err) {
        return reject(err)
      }
      if (next.done) {
        return resolve(next.value)
      }
      Promise.resolve(next.value)
        .then((val) => { step(() => gen.next(val)) })
        .catch((e) => { step(() => gen.throw(e)) })
    }
    step(() => gen.next(undefined))
  })
}

