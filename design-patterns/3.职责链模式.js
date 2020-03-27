
/**
 * 职责链模式，消除过多的if else
 */

class Chain {
  constructor(fn) {
    this.hanlder = fn
    this.nextHandler = null
  }

  setNextHandler(nextHandler) {
    return this.nextHandler = nextHandler
  }

  pass() {
    const res = this.hanlder.apply(this, arguments)
    if (res !== false) {
      return res
    }
    this.next()
  }

  // 手动执行下一函数
  next() {
    if (this.nextHandler) {
      this.nextHandler.pass.apply(this.nextHandler, arguments)
    }
  }
}

/**
 * @param {*} orderType 订单类型(定金用户或者普通购买用户)，
 *                      code 的值为 1 的时候是 500 元 定金用户，
 *                      为 2 的时候是 200 元定金用户，
 *                      为 3 的时候是普通购买用户。
 * @param {*} pay 用户是否已经支付定金，值为 true 或者 false, 
 *                虽然用户已经下过 500 元定金的 订单，但如果他一直没有支付定金，现在只能降级进入普通购买模式。
 * @param {*} stock 当前用于普通购买的手机库存数量，已经支付过 500 元或者 200 元定金的用 户不受此限制。
 */
var order500 = function (orderType, pay, stock) {
  if (orderType === 1 && pay === true) {
    console.log('500 元定金预购，得到 100 优惠券');
  } else {
    return false
  }
};

var order200 = function (orderType, pay, stock) {
  setTimeout(() => {
    if (orderType === 2 && pay === true) {
      console.log('200 元定金预购，得到 50 优惠券');
    } else {
      this.next()
      return false
    }
  }, 1000);
  
}

var orderNormal = function (orderType, pay, stock) {
  if (stock > 0) {
    console.log('普通购买，无优惠券');
  } else {
    console.log('手机库存不足');
  }
};

const o1 = new Chain(order500)

const o2 = new Chain(order200)

const o3 = new Chain(orderNormal)

o1.setNextHandler(o2)
o2.setNextHandler(o3)

o1.pass(2, true, 0)
