// 导入mysql
const mysql = require('mysql')
// 导入express
const express = require('express')
// 创建服务器
const app = express()
// 配置中间件
app.use(express.urlencoded({ extended: false }))
// 通过createPool方法连接服务器
const db = mysql.createPool({
    host: '127.0.0.1', // 表示连接某个服务器上的mysql数据库
    user: 'root', // 数据库的用户名 （默认为root）
    password: 'root', // 数据库的密码 (默认为root)
    database: 'web67',// 创建的本地数据库名称
})
// 通过nodejs获取数据库中的数据  并返回给客户端------------------ 
app.get('/user', (req, res) => {
    // 通过db.query方法来执行mysql  测试是否连接成功
    // 查询语句 data 得到的是一个数组，  增删改得到的是受影响的行数
    db.query('select * from user', (err, data) => {
        if (err) return console.log(err.message); // 连接失败
        if (data.length === 0) return console.log('数据为空'); // 数据长度为0 则没有获取到数据
        // 否则获取成功，将结果返回给客户端res.send
        res.send({
            status: 0,
            msg: '数据获取成功',
            data
        })
    })
})
 
// 给user中添加用户名和密码
app.post('/addUser', (req, res) => {
    const data = req.body // 获取数据（要配置中间件来解析数据  否则显示undefind）
    const sql = 'insert into user set ?' // 构建sql语句
    // 执行sql语句
    db.query(sql, data, (err, data) => {
        if (err) return console.log(err.message); // 判断sql是否执行失败
        // 判断数据是否插入成功 看affectedRows的值是否为1，不为1则写入失败
        if (data.affectedRows !== 1) return console.log('数据写入失败');  
        // 否则写入成功 返回客户端
        res.send({
            status: 0,
            msg: '数据写入成功'
        })
    })
})
 
// 启动服务器
app.listen(80, () => {
    console.log('running...');
})