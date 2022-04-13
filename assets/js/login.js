$(function(){
    //点击去注册
    $('#link_reg').on('click',function(){
        $('.login-box').hide()
        $('.reg-box').show()
    })
    //点击去登录
    $('#link_login').on('click',function(){
        $('.login-box').show()
        $('.reg-box').hide()
    })
    //从layui获取form对象
    var form=layui.form
    var layer=layui.layer
    //通过form自定义校验规则
    form.verify({
        //自定义校验规则
        pwd:[/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'],
        repwd:function(value){
            //通过形参拿到的数据，与密码框进行比较
            var password=$('.reg-box [name=password]').val()
            if(password!==value){
                return '两次密码不一致'
            }
        }
    })
    //监听注册表单的提交事件
    $('#form_reg').on('submit',function(e){
        e.preventDefault()
        $.post('/api/reguser',{username:$('#form_reg [name=username]').val(),password:$('#form_reg [name=password]').val()},function(res){
            if(res.status!==0){
                return layer.msg(res)
            }
            layer.msg('注册成功,请登录')
            //模拟人的点击动作
            $('#link_login').click()
        })
    })
    //监听表单的提交事件
    $('#form_login').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            url:'/api/login',
            method:'POST',
            //快速获取表单数据
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功')
                //将登录成功得到的token保存到本地存储
                localStorage.setItem('token',res.token)
                //跳转后台主页
                location.href='./index.html'
                
            }
        }
    )
})
})