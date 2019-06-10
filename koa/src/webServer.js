const http = require('http');
const Emitter = require('events');

class WebServer extends Emitter {
  constructor() {
    super();
    this.middleware = [];
    this.context = Object.create({})
  }

  listen(...args) {
    const server = http.createServer(this.callback())
    server.listen(...args)
  }

  use(fn){
    if(typeof fn === 'function'){
      this.middleware.push(fn)
    }
  }

  callback(){
    
    // listeners是events模块提供的方法
    if(this.listeners('error').length === 0) {
      this.on('error', this.onerror)
    }

    const handleRequest = (req, res) => {
      let context = this.createContext(req, res);
     
      this.middleware.forEach(
        (cb, index) => {
          try {
            cb(context);
          } catch (err) {
            this.onerror(err)
          }
          
          if(index+1 >= this.middleware.length) {
            if(res && typeof res.end === 'function'){
              res.end();
            }
          }

        }
      )
    }

    return handleRequest;

  }

  // 错误监听
  onerror(err) {
    console.log(err)
  }

  // 给context绑定原生request和response对象
  createContext(req, res) {
    let context = Object.create(this.context);
    context.req = req;
    context.res = res;
    return context;
  }

}

module.exports = WebServer;