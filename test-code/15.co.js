/**
 * 自动执行generator
 */

function co(generatorFn) {
  const args = [...arguments].slice(1)
  const gen = generatorFn.apply(this, args)

  return new Promise((resolve, reject) => {
    function step(data) {
      let it
      try {
        it = gen.next(data)
      } catch (err) {
        return reject(err)
      }
      const { done, value } = it
      if (done) {
        return resolve(value)
      }
      Promise.resolve(value)
        .then(val => step(val))
        .catch(err => reject(err))
    }
    step()
  })
}

const getData = () => new Promise(resolve => setTimeout(() => resolve("data"), 1000))

function* testG(name) {
  console.log(name)
  // await被编译成了yield
  const data = yield getData()
  console.log('data: ', data);
  const data2 = yield getData()
  console.log('data2: ', data2);
  return 'success'
}

const promise = co(testG, 'test')

promise.then(console.log) 