/**
 * 对koa洋葱模型的模拟，加深理解
 */

const compose = require('./compose')

let middleware = [];
let context = {
  data: []
};

middleware.push(async(ctx, next) => {
  console.log('action 001');
  ctx.data.push(1);
  await next();
  console.log('action 006');
  ctx.data.push(6);
});

middleware.push(async(ctx, next) => {
  console.log('action 002');
  ctx.data.push(2);
  await next();
  console.log('action 005');
  ctx.data.push(5);
});

middleware.push(async(ctx, next) => {
  console.log('action 003');
  ctx.data.push(3);
  await next();
  console.log('action 004');
  ctx.data.push(4);
});

const fn = compose(middleware);

fn(context)
  .then(() => {
    console.log('end');
    console.log('context = ', context);
  });



