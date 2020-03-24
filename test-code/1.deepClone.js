/**
 *
 * 循环引用：考虑使用一个数组(或者WeakMap)来存储已经clone前&后的数组和对象，然后判断是否存在，如果存在则直接返回
 *
 * Date: 如果是Date类型，则new Date(date), 会返回一个新的date对象
 *
 * Reg: 如果是正则，通过(/\d+/img).source可以获取到\d+, 可以通过/\w*$/.exec(/\d+/img)[0]获取到img，
 *      也可以用(/\d+/img).flags获取到img(用flags的话有兼容性问题，只有chorme、Firefox支持)，再重新用new RegExp()
 *
 * Function: 初步想法是通过toString之后在用new Function, new Function('return ' + fn.toString())()
 *
 * 以下代码参考lodash cloneDeep函数
 * */

const mapTag = '[object Map]'
const setTag = '[object Set]'
const arrayTag = '[object Array]'
const objectTag = '[object Object]'

const numberTag = '[object Number]'
const boolTag = '[object Boolean]'
const stringTag = '[object String]'
const errorTag = '[object Error]'
const dateTag = '[object Date]'
const symbolTag = '[object Symbol]'
const regexpTag = '[object RegExp]'
const funcTag = '[object Function]'

const needDeepCloneTag = [mapTag, setTag, arrayTag, objectTag]

function isObject(target) {
  const type = typeof target
  return target !== null && (type === 'object' || type === 'function')
}

function getType(target) {
  return Object.prototype.toString.call(target)
}

function getInit(target) {
  const Ctor = target.constructor
  return new Ctor()
}

function cloneSymbol(target) {
  return Object(Symbol.prototype.valueOf.call(target))
}

function cloneReg(target) {
  const regFlags = /\w*$/
  const result = new target.constructor(target.source, regFlags.exec(target)[0])
  result.lastIndex = target.lastIndex
  return result
}

/**
 * 如果使用new Function('return ' + func.toString())是有缺陷的
 * 比如 const obj = { fun() { return 'ha' }, func: function() { return 'ha' }, f: () => { console.log('ha') } }
 * 拷贝fun的时候会报错, func、f正常。
 * 
 * TIPS:如果不考虑this的问题，是不是可以考虑用bind函数，bind会返回一个原函数的拷贝
 * @param {Function} func
 */
function cloneFunction(func) {
  // const f = new Function('return ' + func.toString())
  // return f()
  const bodyReg = /(?<={)(.|\r|\n)+(?=})/m
  const paramReg = /(?<=\().+(?=\)\s+{)/
  const funcString = func.toString()

  const param = paramReg.exec(funcString)
  const body = bodyReg.exec(funcString)
  if (body) {
    if (param) {
      const paramArr = param[0].split(',')
      return new Function(...paramArr, body[0])
    } else {
      return new Function(body[0])
    }
  } else {
    return null
  }
}

function cloneOtherType(target, type) {
  const Ctor = target.constructor
  switch (type) {
    case boolTag:
    case numberTag:
    case stringTag:
    case errorTag:
    case dateTag:
      return new Ctor(target)
    case regexpTag:
      return cloneReg(target)
    case symbolTag:
      return cloneSymbol(target)
    case funcTag:
      return cloneFunction(target)
    default:
      return null
  }
}

function clone(target, map = new WeakMap()) {
  // 克隆原始类型
  if (!isObject(target)) {
    return target
  }

  // 初始化
  const type = getType(target)
  let cloneTarget
  if (!needDeepCloneTag.includes(type)) {
    return cloneOtherType(target, type)
  }
  cloneTarget = getInit(target, type)

  // 防止循环引用
  if (map.get(target)) {
    return map.get(target)
  }
  map.set(target, cloneTarget)

  // 克隆set
  if (type === setTag) {
    target.forEach(value => {
      cloneTarget.add(clone(value, map))
    })
    return cloneTarget
  }

  // 克隆map
  if (type === mapTag) {
    target.forEach((value, key) => {
      cloneTarget.set(key, clone(value, map))
    })
    return cloneTarget
  }

  // 克隆对象和数组
  const keys = type === arrayTag ? undefined : Object.keys(target)
  ;(keys || target).forEach((value, key) => {
    if (keys) {
      key = value
    }
    cloneTarget[key] = clone(target[key], map)
  })

  return cloneTarget
}

/****** 测试 ******/
const obj = {
  arr: [1, 2, { b: 2 }],
  func(a, b) {
    return a + b
  },
  strObj: new String('111'),
  sy: Symbol.for('sy'),
  str: '1',
  bool: true,
  num: 1,
  reg: /\d+/gi,
  date: new Date(2019, 1, 1),
  err: new Error('测试'),
}
obj.loop = obj

const objTmp = clone(obj)
console.log(objTmp)
