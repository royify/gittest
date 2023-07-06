// 导入模块
const mongoose = require('mongoose')

// 连接数据库
mongoose.connect('mongodb://localhost:27017/test1')

// 创建Schema: 主要是为了约束表头数据之间的类型
var userSchema = new mongoose.Schema({
    username:String,
    password:{
        type:String,
        minlength:3,
        required:true
    },
    email:String
}) 

// 创建model
var usermodel = mongoose.model('user',userSchema,'username')

// 导出操作user表的模型
module.exports=usermodel