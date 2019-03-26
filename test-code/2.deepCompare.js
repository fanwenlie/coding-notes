function deepCompare(a, b) {
  if (
    a === null || 
    typeof a !==  'object' ||
    b === null ||
    typeof b !== 'object'
    ) {
    return a === b
  }
  
  const A = Object.getOwnPropertyDescriptors(a)
  const B = Object.getOwnPropertyDescriptors(b);

  if (Object.keys(A).length !== Object.keys(B).length) { return false }

  return Object.keys(A).every(key => deepCompare(a[key], b[key]))
}

const { assert } = require('chai');

assert.equal(
  deepCompare({a: 1}, {a: 1}),
  true
)