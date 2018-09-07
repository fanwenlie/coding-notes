/**
 * 仿照koa中间件形式实现http服务
 */

const _Koa = require('./webServer');

const app = new _Koa();
const PORT = 3301;

app.use(ctx => {
  ctx.res.write('<p>Hello World</p>')
})

app.listen(PORT, () => {
  console.log('监听 http://localhost:3301 端口中...')
})