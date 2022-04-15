$(function(){
    var form=layui.form
    var layer=layui.layer
    form.verify({
        nickname:function(value){
            if(value>6){
                return '昵称长度需要在1~6个之间'
            }
        }
    })
    init_userinfo()
    function init_userinfo(){
        $.ajax({
            method:'GET',
            url:'/my/userinfo',
            //请求头配置对象
            
            success:function(res){
               if(res.status!==0){
                   return layer.msg('获取用户信息失败')
               }
               //填写用户信息
               //调用form.val()快速赋值
               form.val('formUserInfo',res.data)
            }
        })
    }
    $('#btnreset').on('click',function(e){
        e.preventDefault();
        init_userinfo()
    })
    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        //发起ajax
        $.ajax({
            method:'POST',
            url:'/my/userinfo',
            data:$(this).serialize(),
            //请求头配置对象
            
            success:function(res){
               if(res.status!==0){
                   return layer.msg('更新用户信息失败')
               }
               layer.msg('更新用户信息成功')
               window.parent.getuserinfo()
            }
        })
    })
})