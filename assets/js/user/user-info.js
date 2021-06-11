$(function () {
    let form = layui.form
    form.verify({
        nickname: [/^\S{1,6}$/, '昵称应为1-6位非空字符'],
    })
    initUserInfo()
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
            $('.layui-form input[name="username"]').val(res.data.username).attr('disabled')
            $('.layui-form input[name="nickname"]').val(res.data.nickname)
            $('.layui-form input[name="email"]').val(res.data.email)
        }
    })
}