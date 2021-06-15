$(function () {
    initArtCateList()
    let layer = layui.layer
    let form = layui.form
    let index = null
    // 点击添加分类 弹出
    $('#addCate').on('click', function () {

        index = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        });
    })

    // 给弹出的表单添加提交事件 应该通过代理的方式来添加 因为页面创建的时候表单没有创建

    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                initArtCateList()
                layer.close(index)

            }
        })
    })

    // 通过代理的形式,给tbody里的btn-edit绑定点击事件
    $('tbody').on('click', '.btn-edit', function () {
        let id = $(this).attr('data-id')
        index = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '编辑文章分类',
            content: $('#dialog-edit').html()
        });
        $.ajax({
            type: 'GET',
            url: '/my/article/cates/' + id,
            success: function (res) {
                form.val('form-edit', res.data)
                // $('#form-edit  input[name="name"]').val(res.data.name)
                // $('#form-edit input[name="alias"]').val(res.data.alias)
                // $('#form-edit input[name="id"]').val(res.data.Id)
            }
        })
    })

    // 通过代理的形式 给编辑表单添加submit事件
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault()
        console.log(11111);
        let data = $(this).serialize()
        $.ajax({
            type: 'POST',
            url: '/my/article/updatecate',
            data: data,
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                initArtCateList()
                layer.close(index)
            }
        })
    })

    // 通过代理的方式给表单添加删除功能
    $('body').on('click', '.cata-del', function () {
        let id = $(this).attr('data-id')
        layer.confirm('确认删除?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            $.ajax({
                type: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    layer.msg(res.message)
                    initArtCateList()
                    layer.close(index)
                }
            })

            layer.close(index);
        });

    })

    // 初始化函数
    function initArtCateList() {
        $.ajax({
            type: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                var html = template('data-tmp', res)
                $('tbody').html(html)
            }
        })
    }
})