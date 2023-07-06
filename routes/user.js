// 导入模块
const express = require('express')
const bcryptjs = require('bcryptjs')
const userModel = require('../collection/userCollection.js')

// 创建路由
const userRouter = express.Router()

// 处理用户的注册请求
userRouter.post('/register',(req,res)=>{
    // 获取post请求携带的参数
    let {username,password,email}=req.body
    // 查询当前账号,在数据表中是否存在
    userModel.findOne({username},(err,docs)=>{
        // 判断查询语句是否错误
        if(err){
            res.render('successError.html',{
                msg1:'SQL语句查询失败',
                uri:'/register.html',
                msg2:'注册'
            })
            return
        }
        // 判断查询结果是否有内容
        if(docs){
            res.render("successError.html",{
                msg1:"该账号已存在，请重新注册",
                uri:"/register.html",
                msg2:"注册"
            })
            return
        }
        // 把当前注册的密码进行加密
        var p1 = bcryptjs.hashSync(password,10)
        userModel.insertMany([{username,password:p1,email}],(err,docs)=>{
            if(err){
                res.render("successError.html",{
                    msg1:"添加的语句错误",
                    uri:"/register.html",
                    msg2:"注册"
                })
                return
            }
            if(!docs){
                res.render("successError.html",{
                    msg1:"用户注册失败",
                    uri:"/register.html",
                    msg2:"注册"
                })
                return
            }
            res.render("successError.html",{
                msg1:"注册成功",
                uri:"/login.html",
                msg2:"登录"
            })
        })
    })
})


// 处理用户的登录请求
userRouter.post('/login',(req,res)=>{
    // 获取账号密码
    let {username,password}=req.body
    // 查询数据库中是否存在该账号
    userModel.findOne({username},(err,docs)=>{
        if(err){
            res.render("successError.html",{
                msg1:"登录SQL语句查询失败",
                uri:"/login.html",
                msg2:"登录"
            })
            return
        }
        // 判断查询的数据是否为空
        if(!docs){
            res.render("successError.html",{
                msg1:"账号有误",
                uri:"/login.html",
                msg2:"登录"
            })
            return
        }
        // 获取查询到的密码,进行判断
        var bool=bcryptjs.compareSync(password,docs.password)
        if(!bool){
            res.render("successError.html",{
                msg1:"密码有误",
                uri:"/login.html",
                msg2:"登录"
            })
            return
        }
        res.render("successError.html",{
            msg1:"登录成功",
            uri:"/index.html",
            msg2:"首页"
        })
        return
    })
})


//导出路由
module.exports=userRouter
