/**
 * 实现并发多个请求，function request(urls, maxNumber, callback){}, 注意maxNumber, 如果一个请求提前完成了，依旧要保持maxNumber个请求。并且所有请求成功后，返回值按顺序输出
 * @param {*} urls
 * @param {*} maxNumber
 */
function fetchData(url) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(url)
      resolve(url)
    }, 1000)
  })
}
function request(urls, maxNumber) {
  return new Promise((resolve, reject) => {
    const requestUrls = urls.map((url, idx) => ({ url, idx }))
    const tempUrls = requestUrls.slice(0, maxNumber)
    const otherUrls = requestUrls.slice(maxNumber)
    const results = []
    const total = urls.length

    tempUrls.forEach(({ url, idx }) => query(url, idx))

    function query(url, idx) {
      fetchData(url).then((res) => {
        results[idx] = res

        if (otherUrls.length) {
          const { url: tempUrl, idx: tempIdx } = otherUrls.shift();
          query(tempUrl, tempIdx)
        }

        if (total === results.length) {
          resolve(results)
        }
      })
    }
  })
}

request([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3).then((res) => {
  console.log('success', res)
})
