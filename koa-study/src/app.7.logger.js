const Koa = require('koa');

const logger = require('koa-logger')
const app = new Koa();


app.use(logger())

module.exports = app

app.listen(3333);

console.log('server listening on http://localhost:3333');


