
// 返回n <= x <= m的随机整数
const random = (n, m) => {
  return Math.floor(Math.random() * (m - n + 1) + n);
}

/**
 * 细节：
 * 比如 0 - 9 范围有可能返回 0 ，导致值索引不变
 */
const randomArray = (arr) => {
  arr = arr.slice(0)
  const len = arr.length;
  for (let i = 0; i < len; i++) {
    const idx = random(i, len - 1);
    [arr[i], arr[idx]] = [arr[idx], arr[i]]
  }

  return arr
}

console.log('arr', randomArray([1,2,3,4,5,6,7,8,9,10]));
