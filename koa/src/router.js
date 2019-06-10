const fs = require('fs')

function render( page ) {
  return new Promise(( resolve, reject ) => {
    let viewUrl = `./src/view/${page}`
    fs.readFile(viewUrl, "binary", ( err, data ) => {
      if ( err ) {
        reject( err )
      } else {
        resolve( data )
      }
    })
  })
}

module.exports = function () {
  return async function(url){
    let view = '404.html'
    switch ( url ) {
      case '/':
        view = 'index.html'
        break
      case '/index':
        view = 'index.html'
        break
      case '/todo':
        view = 'todo.html'
        break
      case '/404':
        view = '404.html'
        break
      default:
        break
    }
    let html = await render( view )
    return html
  }
}