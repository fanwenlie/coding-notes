class AsyncPlugin {
  constructor(){}

  apply(compiler){
    // compiler.hooks.emit.tapAsync('abc', (compilation, callback)=>{
    //   setTimeout(function() {
    //     console.log('-------Done with async work...');
    //     callback();
    //   }, 1000);
    // })

    compiler.hooks.emit.tapPromise('abc', (compilation)=>{
      return new Promise((resolve, reject) => {
        setTimeout(function() {
          console.log('-------Done with async work...');
          resolve();
        }, 1000);
      })
      
    })
  }
}

module.exports = AsyncPlugin