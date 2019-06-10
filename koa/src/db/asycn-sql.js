// 尝试使用mysql
const mysql = require('mysql')

const pool = mysql.createPool({
  host     : '127.0.0.1',   // 数据库地址
  user     : 'root',    // 数据库用户
  password : 'root',   // 数据库密码
  database : 'koa_database'  // 选中数据库
})


function queryDb(sql) {
  return new Promise(function(resolve, reject){
    // 执行sql脚本对数据库进行读写 
    pool.getConnection(function(err, connection){
      if (err) {
        reject(err)
      } else {

        connection.query(sql,  (error, results, fields) => {
          if (error) {
            reject(error)
          } else {
            
            resolve(results)
          }
          // When done with the connection, release it.
          connection.release();
        });
      }

    })
  })
}

module.exports = {
  queryDb
}