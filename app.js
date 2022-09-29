
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

// 如果希望在托管的静态资源访问路径之前，挂载路径前缀，则可以使用如下的方式；
app.use('/public', express.static('./public'));
// 现在就可以通过带有 /public 前缀地址来访问 public 目录中的文件了：
// http://localhost:80/public/cat.jpg
// http://localhost:80/public/《第二册》.pdf

// 为路由模块添加前缀：
// 1.导入路由模块
const userRouter = require('./router/user.js');
// 2.使用 app.use() 注册路由模块，并添加统一的访问前缀 /user
app.use('/user', userRouter);


// 调用 app.listen 方法，指定端口号并启动web服务器
app.listen(80, function () {
  console.log('Express server running at http://127.0.0.1')
})

