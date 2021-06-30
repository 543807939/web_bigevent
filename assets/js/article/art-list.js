$(function () {
    // 定义一个查询参数对象,查询的时候需要将这个参数提交到服务器
    var q = {
        pagenum: 1, // 页码值 默认是第一页
        pagesize: 2,  // 每页显示数据条数,默认是两条
        cata_id: '', // 文章分类的id
        state: ''    // 文章的发布状态
    }

    let layer = layui.layer
    let form = layui.form
    getClassAndRender()
    getArtAndRender()
    // 获取并渲染文章
    function getArtAndRender() {
        $.ajax({
            type: 'GET',
            url: '/my/article/list',
            data: q,
            success: function (res) {

                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                if (res.data.length <= 0) {
                    // return layer.msg('已获取数据,但数据为空')
                }
                var html = template('tpl-table', res)
                $('tbody').html(html)
                renderPage(res.total)
            }
        })
    }

    // 得到用户选择地分类和状态 重新发送请求并渲染table
    $('#select-form').on('submit', function (e) {
        e.preventDefault()
        q.cata_id = $(this).find('[name="cate_id"]').val()
        q.state = $(this).find('[name="state"]').val()
        getArtAndRender()

    })

    // 动态获取并渲染所有分类
    function getClassAndRender() {
        $.ajax({
            type: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                let html = template('tpl-class', res)
                $('[name="cate_id"]').html(html)
                form.render('select')
            }
        })
    }

    // 定义补零函数
    function addZero(n) {
        return n > 9 ? n : '0' + n
    }

    // 定义美化时间过滤器
    template.defaults.imports.dataFormat = function (date) {
        let dt = new Date(date)
        let year = dt.getFullYear()
        let month = dt.getMonth() + 1
        let day = dt.getDate()
        let hours = dt.getHours()
        let minutes = dt.getMinutes()
        let seconds = dt.getSeconds()
        return `${addZero(year)}-${addZero(month)}-${addZero(day)}- ${addZero(hours)}:${addZero(minutes)}:${addZero(seconds)}`
    }


    // 定义渲染分页方法
    function renderPage(total) {

        var laypage = layui.laypage;

        //执行一个laypage实例
        laypage.render({
            elem: 'test1' //注意，这里的 test1 是 ID，不用加 # 号
            , count: total //数据总数，从服务端得到
            , limit: q.pagesize // 每页显示数据
            , limits: [2, 5, 10, 15] // 可选的每页显示条数
            , layout: ['count', 'prev', 'limit', 'page', 'next', 'skip']
            , curr: q.pagenum    // 默认被选中的页码
            // 分页切换时调用
            , jump: function (obj, first) {
                //obj包含了当前分页的所有参数，比如：
                // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                // console.log(obj.limit); //得到每页显示的条数

                //首次不执行
                if (!first) {
                    q.pagesize = obj.limit
                    q.pagenum = obj.curr
                    getArtAndRender()
                }
            }
        });
    }

    // 通过代理给删除按钮绑定事件
    $('tbody').on('click', '.btn-del', function () {
        // 获取删除按钮的个数
        let length = $('.btn-del').length
        let id = $(this).attr('data-id')
        layer.confirm('确定要删除该文章?', { icon: 3, title: '提示' }, function (index) {
            //do something
            $.ajax({
                type: 'GET',
                url: '/my/article/deleteArticle/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    layer.msg(res.message)
                    // 数据删除完成之后判断当前页面还有没有剩余数据,如果没有则页面减一之后重新调用渲染
                    if (length == 1) {
                        q.pagenum = q.pagenum == 1 ? 1 : q.pagenum--
                    }
                    getArtAndRender()
                }
            })
            layer.close(index);
        });
    })
})