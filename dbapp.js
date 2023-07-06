// 导入模块
const express = require('express')
const path = require('path')
const showRouter = require('./routes/show.js')
const userRouter = require('./routes/user.js')
// 创建服务器
let app = express()

// 监听端口
app.listen(3006,()=>{
    console.log('启动');
})

//配置模板引擎
// 指定art-template模板，并指定模块后缀为.html
app.engine('html', require('express-art-template'));
// 指定模板视图路径，参数1：表示视图，固定写法；参数2：指定的模板目录
app.set('views', path.join(__dirname, 'pages'));
// 省略指定模块文件后缀后名称（可选，在渲染时可以省略的后缀）
app.set('view engine', 'html')	

// 创建静态服务器
app.use(express.static('public'))
// 创建中间件,获取post请求携带的参数
app.use(express.urlencoded({extended:false}))

// 处理所有显示文件的请求
app.use('/',showRouter)

// 处理用户请求
app.use('/user',userRouter)

// 异常处理中间件
app.use((err,req,res,next)=>{
    console.log(err);
    res.send('服务器错误')
})

// 404中间件
app.use((req,res,next)=>{
    res.send('客户端错误')
})