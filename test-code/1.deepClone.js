/**
 * TODO: 
 * 这个函数必然有缺陷，如果是个Date对象呢，是需要传参数的; 还有正则, 函数
 * 
 * 循环引用：考虑使用一个数组(或者WeakMap)来存储已经clone前&后的数组和对象，然后判断是否存在，如果存在则直接返回
 * Date: 如果是Date类型，则new Date(date), 会返回一个新的date对象
 * Reg: 如果是正则，通过(/\d+/img).source可以获取到\d+, (/\d+/img).flags获取到img，再重新用new RegExp()
 * Function: 初步想法是通过toString之后在用new Function, new Function('return ' + fn.toString())()
 * */ 
function clone(obj) {
  if (obj == null || typeof obj !== 'object') return obj;
  
  const newObj = new obj.constructor();
  for (const key in obj) {
    if (Object.getOwnPropertyDescriptors(key)) {
      newObj[key] = clone(obj[key]);
    }
  }
  return newObj;
}

const obj = { arr: [1, 2, { b: 2 }], reg: /\d+/ig, func: function(a, b) { return a + b }, date: new Date(2019, 0, 1) }

const objTmp = clone(obj)
console.log(objTmp)