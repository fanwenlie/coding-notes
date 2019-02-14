const Koa = require('koa');

const Router = require('koa-router');

const fs = require('fs');
const path = require('path')

const app = new Koa();

const static = require('koa-static');

app.use(static(
  path.join(__dirname, './static')
))


app.use(async( ctx, next ) => {
  await next();

  ctx.body = 'Hello world!!!';

})

app.listen(3333);

console.log('server listening on http://localhost:3333');


