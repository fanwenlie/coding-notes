

/**
 * 防抖
 */
function debounce(fn, delay) {
  let timer
  return function d(...args) {
    window.clearTimeout(timer)
    timer = window.setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}
const debounceFn = debounce(() => {
  console.log('debounce')
}, 1000)

/**
 * 节流
 * 
 * 这个节流方法是有缺陷的，事件触发时，会立即执行一次
 */
function throttle(fn, delay) {
  let startTime = Date.now()
  return function d(...args) {
    const curTime = Date.now()
    if (curTime - startTime < delay) {
      return
    }
    fn.apply(this, args)
    startTime = curTime
  }
}

const throttleFn = throttle(() => {
  console.log('throttle')
}, 1000)