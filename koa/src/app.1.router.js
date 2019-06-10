const Koa = require('koa');

const Router = require('koa-router');

const fs = require('fs');

const app = new Koa();


function render( page ) {
  return new Promise(( resolve, reject ) => {
    let viewUrl = `./src/view/${page}.html`
    fs.readFile(viewUrl, "binary", ( err, data ) => {
      if ( err ) {
        reject( err )
      } else {
        resolve( data )
      }
    })
  })
}

let home = new Router();
home.get('/', async (ctx)=>{
  let html = await render('index')
  ctx.body = html
})

let page = new Router();
page.get('/todo', async (ctx)=>{
  let html = await render('todo')
  ctx.body = html
})

let router = new Router();

router.use('/', home.routes())
router.use('/page', page.routes())

app.use(router.routes())
app.use(router.allowedMethods()); // 官方推荐使用该方法，在status不存在和404时生效

app.use(async( ctx, next ) => {
  await next();
  // ctx.response.type = 'text/html';
  // ctx.response.body = '<h1>Hello world!!!</h1>';
  let url = ctx.request.url;

})

app.listen(3333);

console.log('server listening on http://localhost:3333');


