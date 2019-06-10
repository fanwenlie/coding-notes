class DonePlugin {
  constructor(options){
    this.options = options;
  }
  apply(compiler){
    // hooks继承于tpable，有多种生命周期，贯穿整个webpack编译过程，done只是一种一个环节
    // [compiler源码](https://github.com/webpack/webpack/blob/master/lib/Compiler.js)
    compiler.hooks.done.tap('FirstPlugin', (stats)=>{
      console.log(arguments.length)
      console.log('---------------this is a first plugin')
      console.log('------options', this.options);
      // console.log('---------------------Please be sure to understand compilation', stats)
      // callback()
    })
  }
}

module.exports = DonePlugin