$(function () {
    let form = layui.form
    form.verify({
        nickname: [/^\S{1,6}$/, '昵称应为1-6位非空字符'],
    })
    initUserInfo()

    // 重置表单
    $('#btnReset').on('click',function(e){
        e.preventDefault()
        initUserInfo()
    })
    // 提交修改
    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        let data = $(this).serialize()
        console.dir(window);
        $.ajax({
            type:'POST',
            url:'/my/userinfo',
            data:data,
            success:function(res){
                console.log(res);
                if(res.status !== 0){
                    return layui.layer.msg(res.message)
                }
                layui.layer.msg(res.message)
                // 调用父页面的js方法 重新渲染页面
                window.parent.getUserMsg()
            }
        })
    })
})

// 初始化用户信息
function initUserInfo() {
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            console.log(res);
            if (res.status !== 0) {
                return
            }
            layui.form.val('formUserInfo',res.data)
            // $('.layui-form input[name="username"]').val(res.data.username).attr('disabled')
            // $('.layui-form input[name="nickname"]').val(res.data.nickname)
            // $('.layui-form input[name="email"]').val(res.data.email)
        }
    })
}


