const fn = async () => {
  
  // return Promise.reject()
  try {
    console.log(222)
    Promise.reject('111')
  } catch(e) {
    console.log(111);
  }
}
fn()
// try {
//   Promise.resolve(fn())
// } catch(e) {
//   console.log(111);
// }