import app1 from './app1.js';
import app2 from './app2.js';

// import $ from 'jquery'

function component() {
  app1();
  app2();
}
component()

var test = ()=>{
  console.log('=>')
}
test()

var sleep = function(){
  return new Promise((resolve, reject)=>{
    setTimeout(()=>{
      resolve()
    })
  })
}

// $('body').append('<p>hello world!!!</p>')

export default component