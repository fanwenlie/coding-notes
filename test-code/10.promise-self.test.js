const Promise = require('./10.promise-self')


// Promise.all([Promise.resolve(1), Promise.reject(2)])
// 	.then(vals => console.log(vals))
//   .catch(val => console.log(val))


// Promise.race([Promise.resolve(1), Promise.resolve(2)])
//   .then(val => console.log(val))
//   .catch(val => console.log(val))

// 测试穿透问题
// new Promise(resolve => resolve(1)).then().then().then(val => console.log(val))

// 微任务和宏任务
// setTimeout(function(){
//   console.log(1)
// }, 0)
// new Promise(function(resolve){
//   console.log(2);
//   for(var i = 0; i < 11; i++){
//       i == 10 && resolve(4)
//   }
//   console.log(3);
// }).then(function(val){
//   console.log(val);
// })
// console.log(5);
// 输出2，3，5，4，1。 与浏览器和nodejs保持一致

// 测试finally
new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1)
  }, 500);
}).then(val => console.log(val)).finally(()=>console.log('finally'))
