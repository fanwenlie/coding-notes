/**
 * 内存泄露的例子，思考为什么会泄露
 */
var theThing = null
var replaceThing = function () {
  var originalThing = theThing
  var unused = function () {
    if (originalThing)
      console.log("hi")
  }
  theThing = {
    longStr: new Array(1000000).join('*'),
    someMethod: function () {
      console.log('someMessage')
    }
  };
};
setInterval(replaceThing, 1000)

console.log(process.memoryUsage())
/* 
  { rss: 20250624,
  heapTotal: 6537216,
  heapUsed: 4021592,
  external: 8272 }
*/

setTimeout(() => {
  console.log(process.memoryUsage())
  /* 
    { rss: 101990400,
      heapTotal: 88272896,
      heapUsed: 85408840,
      external: 8272 }
  */
}, 1000 * 10);

setTimeout(() => {
  global.gc(); 
  console.log(process.memoryUsage())
  /* 
    { rss: 131563520,
      heapTotal: 23322624,
      heapUsed: 17817600,
      external: 8272 }
  */
}, 1000 * 15);