/**
 * 给插件添加自定义hook
 */
const {SyncHook} = require('tapable');
class CustomHookPlugin {
  constructor(options){
    this.options = options;
    // tapable官网推荐使用此种方式扩展hooks
    this.hooks = {
      show: new SyncHook()
    }
  }

  apply(compiler){
    console.log('首先执行CustomHookPlugin内部逻辑')
    
    this.hooks.show.tap('懒得打字', ()=>{
      console.log('CustomHookPlugin 自定义hook show函数内部')
    })
    // done是异步串行 AsyncSeriesBailHook 注意其特点
    // 如果setTimeout时间设置为十秒，
    compiler.hooks.done.tapPromise('随便打试试', (stats)=>{
      return new Promise((resolve, reject)=>{
        setTimeout(()=>{
          console.log('DONE事件已经触发');
          resolve()
          this.hooks.show.call();
        }, 1000)
      })
    })
  }
}

module.exports = CustomHookPlugin