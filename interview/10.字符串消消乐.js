/**
 * 字符串消消乐。消除三个及以上相邻的字符串.
 * 注意：bbb消除，dddd消除，ccc会相连，也需要消除
 * input: src_str = abbbcddddccef 
 * output: dst_str = aef
 * 
 * 解题思路：
 * 1. 用repeatCount来统计是否满足字符串重复三次及以上的条件
 * 2. repeatStartIdx和repeatEndIdx分别来保存当前重复字符串的索引
 * 3. loopIdx：当我消除了一次字符串，使索引归0，方便再次从头开始对比
 * 4. 如果repeatCount >= 3, 则remove, 并且重置repeatCount、repeatStartIdx和repeatEndIdx，loopIdx
 */

// 用迭代的方式实现
function happyDispel(str) {
  const strs = str.split('')
  let repeatCount = 1
  let repeatStartIdx = -1
  let repeatEndIdx = -1
  let loopIdx = 0

  function remove(startIdx, endIdx) {
    if (startIdx === -1 || endIdx === -1) { return }

    strs.splice(startIdx, endIdx - startIdx + 1)

    repeatCount = 1
    repeatStartIdx = -1
    repeatEndIdx = -1
    loopIdx = 0
  }

  for(; loopIdx < strs.length; loopIdx++) {
    const curIdx = loopIdx
    const nextIdx = loopIdx + 1
    const cur = strs[curIdx]
    const next = strs[nextIdx]
    if (cur !== next) {
      if (repeatCount >= 3) {
        remove(repeatStartIdx, repeatEndIdx)
      }
      continue
    }

    if (repeatCount === 1) {
      repeatStartIdx = curIdx
    }
    repeatCount++
    if (repeatCount >= 3) {
      repeatEndIdx = nextIdx
    }
  }
  return strs.join('')
}

// console.log(happyDispel('abbbcddddccefc'))
// console.log(happyDispel('aaaaaaaax'))
// console.log('---', happyDispel('aaaaaaaa'))
// console.log(happyDispel('baaaabaaaaxx'))
// console.log(happyDispel('baaaabaaaxaaaxx'))


// 用递归的方式实现， 有bug，下面的测试用例有的无法通过
function dispel(str) {
  if (str.length < 3) return str
  let total = 1
  let baseStr = str[0]
  
  for (let i = 1; i < str.length; i++) {
    if (str[i] === baseStr) {
      total++
      continue
    }
    if (total >= 3) {
      const idx =  i - total
      str = `${str.substring(0, idx)}${str.substring(i)}`
      return dispel(str)
    }

    baseStr = str[i]
    total = 1
  }
  if (total >= 3) {
    let idx = str.length - total
    str = str.substring(0, idx) + str.substring(str.length)
  }
  return str
}

console.log(dispel('abbbcddddccefc'))
console.log('---', dispel('aaaaaaaax'))
console.log('---', dispel('aaaaaaaa'))
console.log('---', dispel('baaaabaaaaxx'))
console.log('---', dispel('baaaabaaxaaaxx'))
