$(function(){
    var layer=layui.layer
    var form=layui.form
    initArticleList()
    //获取文章分类列表
    function initArticleList(){
        $.ajax({
            method:'GET',
            url:'/my/article/cates',
            success:function(res){
                var htmlstr=template('tpl-table',res)
                $('tbody').html(htmlstr)
            }
        })
    }
    var indexadd=null
    var indexeit=null
    var indexremove=null
    $('#btnAddCate').on('click',function(){
        indexadd=layer.open({
            type:1,
            area: ['500px', '250'],
            title: '添加文章分类'
            ,content: $('#dialog-add').html()
          });    
    })
    //通过代理的形式进行绑定
    $('body').on('submit','#form-add',function(e){
        e.preventDefault();
        $.ajax({
            method:'POST',
            url:'/my/article/addcates',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return layer.msg('新增分类失败')
                }
                initArticleList()
                layer.msg('新增分类成功')
                layer.close(indexadd)
            }
        })
    })
     //通过代理的形式进行绑定
     $('tbody').on('click','#btn-edit',function(){
         //弹出修改的弹出层
         indexeit=layer.open({
            type:1,
            area: ['500px', '250'],
            title: '修改文章分类'
            ,content: $('#dialog-edit').html()
          })
          var id=$(this).attr('data-id')
          //根据ID获取对应的信息
          $.ajax({
            method:'GET',
            url:'/my/article/cates/'+id,
            success:function(res){
                if(res.status!==0){
                    return layer.msg('获取数据失败')
                }
                form.val('form-edit',res.data)
                //layer.close(indexadd)
            }
        })
     })
     $('body').on('submit','#form-edit',function(e){
        e.preventDefault();
        
        $.ajax({
            method:'POST',
            url:'/my/article/updatecate',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return layer.msg('修改分类失败')
                }
                initArticleList()
                layer.msg('修改分类成功')
                layer.close(indexeit)
            }
        })
     })
      //通过代理的形式进行绑定
      $('tbody').on('click','#btn-remove',function(){
        var id=$(this).attr('data-id')
        layer.confirm('确认删除?', {icon: 3, title:'提示'}, function(index){
            
            $.ajax({
                method:'GET',
                url:'/my/article/deletecate/'+id,
                success:function(res){
                    if(res.status!==0){
                        return layer.msg('删除数据失败')
                    }
                    layer.msg('删除数据成功')
                    initArticleList()
                }
          })
            
            layer.close(index);
          });
       
     })
})