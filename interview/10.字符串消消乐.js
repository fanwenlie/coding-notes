/**
 * 字符串消消乐。消除三个及以上相邻的字符串.
 * 注意：bbb消除，dddd消除，ccc会相连，也需要消除
 * input: src_str = abbbcddddccef 
 * output: dst_str = aef
 * 
 * 解题思路：
 * 1. 如果
 * 
 * 
 */

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

console.log(dispel('abbbcddddccefc'))