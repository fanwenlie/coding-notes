/**
 * 某个算法星球的央行发行了奇葩币，币值分别为1、5、11，要凑够15元
 * 求使用最少币的情况
 * 期待输出：[5, 5, 5]
 *
 * 1. 15个1
 * 2. 3个5
 * 3. 1个5,10个1；2个5,5个1；
 * 4. 1个11,4个1
 */

function money(coins, amount) {
  //为了更高效且不重复计算值，使用一个缓存
  let cache = {}

  const handle = (amount) => {
    //若amount不为正，直接返回空数组
    if (!amount) {
      return []
    }

    //检查缓存，若答案已经被计算过，就直接返回结果
    if (cache[amount]) {
      return cache[amount]
    }

    let min = []
    let newMin
    let newAmount

    for (let i = 0; i < coins.length; i++) {
      let coin = coins[i]
      newAmount = amount - coin
      if (newAmount >= 0) {
        newMin = handle(newAmount)
      }
  
      //每一个差值的可行的答案都会找到，但要寻找最优解的答案，即使用面值数量最少的方式
      if (
        newAmount >= 0 && //差值大于等于零
        (newMin.length < min.length - 1 || !min.length) && //当前获取到的组合长度小于以前组合或者以前组合为空
        (newMin.length || !newAmount) //当前获取到的组合有值或者差值为零
      ) {
        //若以上判断都成立，意味着有一个比之前更优的答案
        min = [coin].concat(newMin)
      }
    }

    cache[amount] = min

    return min
  }

  return handle(amount)
}

const result = money([1, 5, 11], 15)

console.log(result)
