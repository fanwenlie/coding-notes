/**
 * 求全排列，比如[1, 2, 3]有(3!， N的阶乘项)种排列
 * 
 */

 // 最通俗易懂的算法
// function perm(Arr) {
//   if (Arr.length === 1) { return [Arr]; } 
//   return [].concat(
//     ...Arr.map(
//       (item, i) => perm(
//         Arr.slice(0, i).concat( Arr.slice(i+1) )
//       ).map(p => [item].concat(p))
//     )
//   )
// }
// console.log(perm([2, 1]))

// 迭代器
// function* perm(Arr, N) {
//   if (!N) { N = Arr.length }

//   if (N === 1) { yield Arr.slice(); return }

//   for (let i = 0; i < N; i++) {
//     swap(Arr, i, N-1)
//     yield * perm(A, N - 1)
//     swap(Arr, i, N-1)
    
//   }
// }

