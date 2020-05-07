/**
 * 实现并发多个请求，function request(urls, maxNumber, callback){}, 注意maxNumber, 如果一个请求提前完成了，依旧要保持maxNumber个请求
 * @param {*} urls 
 * @param {*} maxNumber 
 * @param {*} callback 
 */
function fetchData(url) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(url)
      resolve()
    }, 1000);
  })
}
function request(urls, maxNumber, callback) {
  const tempUrls = urls.slice(0, maxNumber)
  const otherUrls = urls.slice(maxNumber)
  const total = urls.length
  let count = 0

  tempUrls.forEach(url => query(url))

  function query(url) {
    fetchData(url)
      .then(() => {
        count++
        if (otherUrls.length) {
          query(otherUrls.shift())
          return 
        }
        if (total === count) { callback() }
      })
  }
}

request([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3, () => { console.log('success') })