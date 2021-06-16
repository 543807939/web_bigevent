$(function () {
    let layer = layui.layer
    let form = layui.form



    renderClass()
    // 初始化富文本编辑器
    initEditor()

    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)

    // 点击选择封面 选择文件
    $('#btnChooseImage').on('click', function () {
        $('#coverFile').click()
    })
    // 获取文章分类列表,并渲染文章分类
    function renderClass() {
        $.ajax({
            type: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                let html = template('tpl-class', res)
                $('.select-class').html(html)
                form.render();
            }
        })
    }
})