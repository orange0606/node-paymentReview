var express = require('express');               // 1. 导入 express
var router = express.Router();                  // 2. 创建路由对象

// 引入数据库
var mysql = require('mysql');
// 引入db配置
const { db } = require('../database/config');
// 通过createPool方法连接服务器
const connection = mysql.createPool(db);

// router.get('/user/list', function (req, res) {  // 3. 挂载获取用户列表的路由
//   res.send('Get user list.')
// })
// router.post('/user/add', function (req, res) {  // 4. 挂载添加用户的路由
//   res.send('Add new user.')
// })


// 获取用户列表
router.get("/list", (req, res) => {
  var usersSQL = 'SELECT * FROM orange_lxdb.users';

  // 通过db.query方法来执行mysql  测试是否连接成功
  // 查询语句 data 得到的是一个数组，  增删改得到的是受影响的行数
  connection.query(usersSQL, (err, data) => {
    // if (err) return console.log(err.message); // 连接失败
    if (err) {
      return res.send(JSON.stringify(err));
    }
    console.log('orange => data : ', data)
    var users = data || [];
    users.forEach(element => delete element.passWord);
    
    // 否则获取成功，将结果返回给客户端res.send
    res.send({
      status: 200,
      msg: '数据获取成功',
      data
    })
    // // 当连接池不需要使用时，关闭连接池
    connection.end()
  })

});

module.exports = router;                        // 5. 向外导出路由对象