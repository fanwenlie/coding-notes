import app1 from './app1.js';
import app2 from './app2.js';

// import $ from 'jquery'

import './index.css'

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

import(/* webpackChunkName: "appasync" */'./app.async.js').then(( {test} )=>{
  console.log(test())
})
// 第一次编写loader
import './first_loader_test.js'
// 供three-loader使用
// import './logo.png'

// $('body').append('<p>hello world!!!</p>')

document.querySelector('body').appendChild(document.createTextNode('Hello world!!!'))

export default component