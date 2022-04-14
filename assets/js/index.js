$(function(){
    getuserinfo()
    var layer=layui.layer
    $('#btnlogout').on('click',function(){
        layer.confirm('确定要退出吗?', {icon: 3, title:'提示'}, function(index){
            //do something
            
           //清空token
           localStorage.removeItem('token')
           location.href='/login.html'
           layer.close(index)
          })
    })
})
//获取用户基本信息
function getuserinfo(){
    $.ajax({
        method:'GET',
        url:'/my/userinfo',
        //请求头配置对象
        
        success:function(res){
           if(res.status!==0){
               return layui.layer.msg('获取用户信息失败')
           }
           //渲染用户头像
           renderavater(res.data)
        }
    })
}
function renderavater(user){
    var name=user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;'+name)
    if(user.user_pic!==null){
        $('.layui-nav-img').attr('src',user.user_pic).show()
        $('.text-avater').hide()
    }else{
        $('.layui-nav-img').hide()
        var first=name[0].toUpperCase()
        $('.text-avater').html(first).show()
    }
}