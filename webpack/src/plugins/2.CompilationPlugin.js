class CompilationPlugin {
  constructor(){}
  // compiler相当于一个webpack实例，其中有所有的pwebpack配置信息，包括loaders，plugins等
  apply(compiler) {
    // compilation代表的是一次编译，换句话说，只要发生了变化，会有多次编译，但只有一次compiler
    // 开发环境下，run dev，会发现下面log执行了两次
    compiler.hooks.compilation.tap('SecondPlugin', compilation => {
      // compilation同样也有事件钩子，供我们使用
      compilation.hooks.optimize.tap('SecondPlugin', () => {
        console.log('----------Assets are being optimized.');
      });
    })
  }
}

module.exports = CompilationPlugin