$(function () {
    var layer = layui.layer
    var form = layui.form
    var laypage = layui.laypage
    //定义查询对象，请求数据时将对象提交到服务器
    var q = {
        pagenum: 1, // 页码值，默认请求第一页的数据
        pagesize: 2, // 每页显示几条数据，默认每页显示2条
        cate_id: '', // 文章分类的 Id
        state: '' // 文章的发布状态
    }
    initTable()
    initCate()
    //h获取文章列表数据
    function initTable() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章列表失败！')
                }
                console.log(res);
                // 使用模板引擎渲染页面的数据
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
                //调用渲染分页的方法
                readerPage(res.total)
            }
        })
    }

    // 定义美化时间的过滤器
    template.defaults.imports.dataFormat = function (date) {
        const dt = new Date(date)

        var y = dt.getFullYear()
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())

        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())

        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }

    // 定义补零的函数
    function padZero(n) {
        return n > 9 ? n : '0' + n
    }

    // 初始化文章分类的方法
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取分类数据失败！')
                }
                // 调用模板引擎渲染分类的可选项
                var htmlStr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlStr)
                // 通过 layui 重新渲染表单区域的UI结构
                form.render()
            }
        })
    }
    //为筛选表单绑定submit时间
    $('#form-search').on('submit', function (e) {
        e.preventDefault()
        // 获取表单中选中项的值
        var cate_id = $('[name=cate_id]').val()
        var state = $('[name=state]').val()
        // 为查询参数对象 q 中对应的属性赋值
        q.cate_id = cate_id
        q.state = state
        // 根据最新的筛选条件，重新渲染表格的数据
        initTable()
    })
    //定义渲染分页的方法
    function readerPage(total) {
        //调用layui的分页laypage实例
        laypage.render({
            elem: 'pageBox',
            count: 10,
            limit: q.pagesize,
            curr: q.pagenum,
            layout:['count','limit','prev', 'page', 'next','skip'],
            limits:[2, 5, 10, 15, 20],
            //分页发生切换时触发的回调函数
            jump: function (obj, first) {
                //把最新的页码值赋值
                q.pagenum = obj.curr
                //最新的条目数赋值到查询参数上面
                q.pagesize=obj.limit
                if (!first) {
                    initTable()
                }
            }
        })
    }
    //删除按键的方法
    $('tbody').on('click', '#btn-remove', function() {
        // 获取删除按钮的个数
        var len = $('#btn-remove').length
        // 获取到文章的 id
        var id = $(this).attr('data-id')
        // 询问用户是否要删除数据
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
          $.ajax({
            method: 'GET',
            url: '/my/article/delete/' + id,
            success: function(res) {
              if (res.status !== 0) {
                return layer.msg('删除文章失败！')
              }
              layer.msg('删除文章成功！')
              // 当数据删除完成后，需要判断当前这一页中，是否还有剩余的数据
              // 如果没有剩余的数据了,则让页码值 -1 之后,
              // 再重新调用 initTable 方法
              // 4
              if (len === 1) {
                // 如果 len 的值等于1，证明删除完毕之后，页面上就没有任何数据了
                // 页码值最小必须是 1
                q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
              }
              initTable()
            }
          })
    
          layer.close(index)
        })
    })
})