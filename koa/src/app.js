const Koa = require('koa');
const app = new Koa();
const cluster = require('cluster')
const numCPUs = require('os').cpus().length;


const middleware = async function(ctx, next) {
  // 中间件 代理/挂载上下文
  // 把所有当前服务的进程PID，内存使用情况方法代理/挂载在ctx上
  ctx.getServerInfo = function() {
    function parseMem( mem = 0 ) {
      let memVal = mem / 1024 / 1024;
      memVal = memVal.toFixed(2) + 'MB';
      return memVal;
    }

    function getMemInfo() {
      let memUsage = process.memoryUsage();
      let rss = parseMem(memUsage.rss);
      let heapTotal = parseMem(memUsage.heapTotal);
      let heapUsed =  parseMem(memUsage.heapUsed);
      return {
        pid: process.pid,
        rss,
        heapTotal,
        heapUsed
      }
    }
    return getMemInfo()
  };
  await next();
}

const page = async function(ctx, next) {
  const serverInfo = ctx.getServerInfo();
  ctx.body = `
      <html>
        <head></head>
        <body>
          <p>${JSON.stringify(serverInfo)}</p>
        </body>
      </html>
    `;
}

app.use(middleware);
app.use(page);

// if (cluster.isMaster) {
//   console.log(`主进程 ${process.pid} 正在运行`);

//   // 衍生工作进程。
//   for (let i = 0; i < 2; i++) {
//     cluster.fork();
//   }

//   cluster.on('exit', (worker, code, signal) => {
//     console.log(`工作进程 ${worker.process.pid} 已退出`);
//   });

// } else {
//   app.listen(3001, function(){
//     console.log(`工作进程 ${process.pid} 已启动`);
//     console.log('the demo is start at port 3001');
//   })
// }

app.listen(3001, function(){
  console.log(`工作进程 ${process.pid} 已启动`);
  console.log('the demo is start at port 3001');
})
