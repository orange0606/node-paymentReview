// 引入数据库
var mysql = require('mysql');

// 导入fs模块
const fs = require('fs');

// 导入 express 模块
const express = require('express');

// 创建 express 的服务器实例
const app = express();
// 注意：除了错误级别的中间件，其他的中间件，必须在路由之前进行配置
// 通过 express.json() 这个中间件，解析表单中的 JSON 格式的数据
app.use(express.json());
// 通过 express.urlencoded() 这个中间件，来解析 表单中的 url-encoded 格式的数据
app.use(express.urlencoded({ extended: false }));

// 引入db配置
const { db } = require('./database/config');
// 通过createPool方法连接服务器
const connection = mysql.createPool(db);


// 获取用户列表
app.get("/listUsers", (req, res) => {
  var usersSQL = 'SELECT * FROM orange_lxdb.users';

  // 通过db.query方法来执行mysql  测试是否连接成功
  // 查询语句 data 得到的是一个数组，  增删改得到的是受影响的行数
  connection.query(usersSQL, (err, data) => {
    if (err) return console.log(err.message); // 连接失败
    console.log('orange => data : ', data)
    var users = data || [];
    users.forEach(element => delete element.passWord);
    
    // 否则获取成功，将结果返回给客户端res.send
    res.send({
      status: 200,
      msg: '数据获取成功',
      data
    })
    // 当连接池不需要使用时，关闭连接池
    connection.end()
  })

});

app.get("/aaa", (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end("/aaa");
});

// // 获取用户列表
// app.get("/listUsers", (req, res) => {
//   fs.readFile(__dirname + "/json/users.json", 'utf8', (err, data) => {
//     res.setHeader('Content-Type', 'application/json');
//     res.statusCode = 200;
//     const jsonData = JSON.parse(data) || { data: [] };
//     const users = jsonData.data.map(item => {
//       return { id: item.id, name: item.name, profession: item.profession }
//     })
//     const body = { data: [ ...users, ...users, ...users ] };
//     res.end(JSON.stringify(body));
//   })
// });

// 获取用户列表
app.get("/getDetail/:id", (req, res) => {
  fs.readFile(__dirname + "/json/users.json", 'utf8', (err, data) => {
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    const id = req.params.id;
    const jsonData = JSON.parse(data) || { data: [] };
    const user = jsonData.data.find(item => id == item.id);
    if (user) {
      delete user.password // 删除密码字段
    }
    const body = { data: user || null };
    res.end(JSON.stringify(body));
  })
});
app.post('/user', (req, res) => {
  // 在服务器，可以使用 req.body 这个属性，来接收客户端发送过来的请求体数据
  // 默认情况下，如果不配置解析表单数据的中间件，则 req.body 默认等于 undefined
  console.log(req.body)
  res.send('ok')
})

app.post('/book', (req, res) => {
  // 在服务器端，可以通过 req,body 来获取 JSON 格式的表单数据和 url-encoded 格式的数据
  console.log(req.body)
  res.send('ok')
})

// 调用 app.listen 方法，指定端口号并启动web服务器
app.listen(8080, function () {
  console.log('Express server running at http://127.0.0.1')
})

