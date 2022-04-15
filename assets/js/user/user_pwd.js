$(function(){
    var form=layui.form
    var layer=layui.layer
    form.verify({
        pwd:[/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'],
        samepwd:function(value){
            //通过形参拿到的数据，与密码框进行比较
            var password=$('[name=oldPwd]').val()
            if(password===value){
                return '新旧密码不能一样'
            }
        },
        repwd:function(value){
            //通过形参拿到的数据，与密码框进行比较
            var password=$('.layui-input-block [name=newPwd]').val()
            if(password!==value){
                return '两次密码不一致'
            }
        }
    })
    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        //发起ajax
        $.ajax({
            method:'POST',
            url:'/my/updatepwd',
            data:$(this).serialize(),
            //请求头配置对象
            
            success:function(res){
               if(res.status!==0){
                   return layer.msg('更新密码失败')
               }
               layer.msg('更新用户密码成功')
               $('.layui-form')[0].reset()
            }
        })
    })
    
})