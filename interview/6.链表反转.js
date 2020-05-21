/**
 * 原地反转链表
 * 
 */


function reverseList(list) {
  // debugger
  let cur = list
  let prev = null
  while (cur) {
    const temp = cur.next
    cur.next = prev
    prev = cur
    cur = temp
  }

  return prev
}

const list = {
  key: 1,
  next: {
    key: 2,
    next: {
      key: 3,
      next: null,
    }
  }
}

console.log(reverseList(list))
