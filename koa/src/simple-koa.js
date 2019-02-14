const http = require('http');
const Emitter = require('events');
const compose = require('./compose')

const context = {
  _body: null,
  get body(){
    return this._body
  },
  set body(val){
    this._body = val;
    this.res.end(this._body);
  }
}

class SimpleKoa extends Emitter {
  constructor() {
    super();
    this.middleware = [];
    this.context = Object.create(context);
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
     
      compose(this.middleware)(context).catch(()=>{
        this.onerror(err)
      })
    }

    return handleRequest;

  }

  // 错误监听
  onerror(err) {
    console.log(err)
    // this.emit('error', err)
  }

  // 给context绑定原生request和response对象
  createContext(req, res) {
    let context = Object.create(this.context);
    context.req = req;
    context.res = res;
    return context;
  }

}

module.exports = SimpleKoa;