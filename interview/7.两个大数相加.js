/**
 * 两个大数相加，两个数类型都是字符串类型，例如：
 * 
 * '12345677889' + '987645342'
 * 
 * 如果还有小数点呢？
 * '12345677889.9' + '987645342.29'
 */

function sum(a, b) {
  let aLen = a.length
  let bLen = b.length
  let index = Math.max(aLen, bLen)

  let result = []
  let temp = 0
  while (index !== 0) {
    index--
    aLen--
    bLen--

    const aVal = ~~(a.charAt(aLen))
    const bVal = ~~(b.charAt(bLen))
    const total = aVal + bVal + temp
    if (total > 9) {
      temp = 1
      result.unshift(total - 10)
    } else {
      temp = 0
      result.unshift(total)
    }
    
  }
  if (temp !== 0) { result.unshift(temp) }

  return result.join('')
}

console.log(12345677889 + 987645342)

console.log( sum('12345677889', '987645342') )

function sumFloat(a, b) {
  let [aInt, aDecimal] = a.split('.') 
  let [bInt, bDecimal] = b.split('.') 
  aDecimal = aDecimal || '0'
  bDecimal = bDecimal || '0'

  
  let aLen = aDecimal.length
  let bLen = bDecimal.length
  let maxLen = Math.max(aLen, bLen)
  if (aLen > bLen) {
    bDecimal += '0'.repeat(aLen - bLen)
  } else {
    aDecimal += '0'.repeat(bLen - aLen)
  }

  const totalInt = sum(aInt, bInt)
  const totalDecimal = sum(aDecimal, bDecimal)
  const totalLen = totalDecimal.length
  if (totalLen > maxLen) {
    const len = totalLen - maxLen
    const prev = totalDecimal.substring(0, len)
    const next = totalDecimal.substring(len)
    return `${sum(totalInt, prev)}.${next}`
  } else {
    return `${totalInt}.${totalDecimal}`
  }
}

console.log(sumFloat('12345677889', '987645342'))