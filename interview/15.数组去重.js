const { assert } = require('chai')
// 去重1
assert.deepEqual(
  [...new Set([1, 2, 3, 3, 4])],
  [1, 2, 3, 4]
)

// 去重2
function uniq(arr) {
  return arr.reduce((acc, cur, idx, array) => {
    return acc.concat(
      acc.includes(cur) ?  [] : cur
    )
  }, [])
}

assert.deepEqual(
  uniq([1, 2, 3, 3, 4]),
  [1, 2, 3, 4]
)

// 去重3
function uniq3(arr) {
  const obj = {};
  for (let i = 0, len = arr.length; i < len; i++) {
    const cur = arr[i];
    if (obj[cur]) {
      continue;
    } else {
      obj[cur] = cur
    }
  }
  return Object.values(obj)
}

assert.deepEqual(
  uniq3([1, 2, 3, 3, 3, 2, 1, 2, 4]),
  [1, 2, 3, 4],
  'uniq3'
)
