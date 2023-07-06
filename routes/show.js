//导入模块
const express = require("express")
//创建路由对象
const router1 = express.Router()

router1.get("/",(req,res)=>{
    //输出模板文件，index.html
    res.render("index.html")
})
router1.get("/index.html",(req,res)=>{
    //输出模板文件，index.html
    res.render("index.html")
})
router1.get("/login.html",(req,res)=>{
    //输出模板文件，index.html
    res.render("login.html")
})
router1.get("/register.html",(req,res)=>{
    //输出模板文件，index.html
    res.render("register.html")
})

//导出路由对象
module.exports = router1