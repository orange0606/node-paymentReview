// 引入数据库
var mysql = require('mysql');

// 引入db配置
const { db } = require('./config');

// 实现本地连接
let connection = mysql.createConnection(db)
connection.connect((err) => {
  if (err) throw err
  console.log('数据库连接成功')
})

connection.end((err) => {
  if (err) throw err
  console.log('数据库断开连接')
})

// exports.connection = connection;

module.exports = {
  connection
}
