export default function printMe() {
  console.log('app1 import2');

  var testP = new Promise((resolve, reject)=>{
    setTimeout(function(){
      resolve()
    })
  })
}