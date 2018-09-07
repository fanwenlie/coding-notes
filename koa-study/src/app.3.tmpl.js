const Koa = require('koa');

const Router = require('koa-router');

const views = require('koa-views')

const path = require('path')

const app = new Koa();

app.use(views(
  path.join(__dirname, './view'),{
    extension: 'ejs'
  }
))

app.use(async( ctx, next ) => {
  // await next();
  let title = 'Hello world!!!'
  await ctx.render('index', {title})

})

app.listen(3333);

console.log('server listening on http://localhost:3333');


