/**
 * pitching loader
 * 有点类似koa中的洋葱模型，一个模块use了多个loader，执行顺序是从右往左的，或者下往上的
 * 但是如果都有pitch的话，loader.pitch首先按从左往右，从上到下执行，然后再执行loader
 */
let loader = function (source) {
  let cb = this.async();
  console.log('------loader1');
  cb(null, source);
}
loader.pitch = function () {
  console.log('-----pitch1');
}
module.exports = loader;
