//获取输入框对象
var frm=document.querySelector("form")
//获取所有表单元素
var inps=document.querySelectorAll("input")
var spans=document.querySelectorAll("span")
//定义变量，代表密码是否验证成功
var p1=false
//给第二个输入框绑定失去焦点事件
inps[1].onblur=function(){
    //获取输入框中的value属性值
    var val=this.value
    //正则表达式
    var reg=/^\w{3,10}$/
    if(reg.test(val)){
        //给当前输入框后面的span标签一个提示
        spans[1].innerHTML='√'
        p1=true
    }else{
        spans[1].innerHTML='密码输入有误'
        p1=false
    }
}

//给表单绑定onsubmit事件
frm.onsubmit=function(){
    if(p1){
        return true
    }else{
        inps[1].onblur()
        return false
    }
}