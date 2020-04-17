/**
  for (var i = 0; i < 5; i++) {
    setTimeout(() => {
      console.log(i)
    }, i * 1000);
  }

  console.log('end', i) // 这个i必须是上面for循环声明的i的值

  改造上面的代码，使之每隔一秒输出0，1，2，3，4，end 5

  相关扩展面试题：红黄绿路灯每隔一秒循环执行
 */

function p() {
  const promises = []

  const output = (i) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(i)
        resolve()
      }, i * 1000);
    })
  }

  for (var i = 0; i < 5; i++) {
    promises.push(output(i))
  }

  Promise.all(promises).then(() => {
    setTimeout(() => {
      console.log('end', i)
    }, 1000);
  })
}

// p()

/**
 * 用async/await改造代码
 */
async function loop() {
  const sleep = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve()
      }, 1000);
    })
  }

  for (var i = 0; i < 5; i++) {
    await sleep()
    console.log(i)
  }

  await sleep()
  console.log('end', i)
}
loop()