export function test(){
  return new Promise((resolve, reject)=>{
    setTimeout(function(){
      resolve('async')
    })
  })
}