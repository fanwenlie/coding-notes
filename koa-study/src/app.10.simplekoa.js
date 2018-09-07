/**
 * 仿照koa的洋葱模型和async实现中间件模式
 * 简单koa实现
 */
const _Koa = require('./simple-koa');

const app = new _Koa();
const PORT = 3301;

app.use(async ctx => {
  ctx.body = '<p>Hello World</p>'
})

app.listen(PORT, () => {
  console.log('监听 http://localhost:3301 端口中...')
})