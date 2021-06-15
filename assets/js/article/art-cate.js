$(function () {
    initArtCateList()

    $('#addCate').on('click', function () {
        let layer = layui.layer
        layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类'
            , content: $('#dialog-add').html()
        });
    })


    function initArtCateList() {
        $.ajax({
            type: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                var html = template('data-tmp', res)
                $('tbody').html(html)
                console.log(1111111);
            }
        })
    }
})