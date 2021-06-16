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
    $('#coverFile').on('change', function (e) {
        let files = e.target.files
        if (files.length == 0) {
            return
        }
        let fileURL = URL.createObjectURL(files[0])
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', fileURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
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

    // 设置默认状态为已发布
    let art_state = '已发布'
    // 点击存为草稿 将状态改为草稿
    $('#saveAsDraft').on('click', function (e) {
        // e.preventDefault()
        art_state = '草稿'
    })
    $('#publish').on('click', function (e) {
        // e.preventDefault()
        art_state = '已发布'
    })

    $('#art-form').on('submit', function (e) {
        e.preventDefault()

        let fd = new FormData($(this)[0])
        fd.append('state', art_state)
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) { // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                fd.append('cover_img', blob)
                fd.forEach(element => {
                    console.log(element);
                });
                publishArticle(fd)
            })
    })

    function publishArticle(fd) {
        console.log(1111);
        $.ajax({
            type: 'POST',
            url: '/my/article/add',
            data: fd,
            conentType:false,
            processData:false,
            success: function (res) {
                layer.msg(res.message)
            }
        })
    }
})