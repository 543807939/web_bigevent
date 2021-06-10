$(function () {
    getUserMsg()

    // 用户退出
    $('#btnLoginOut').on('click', function () {
        layui.layer.confirm('确认要退出吗?', { icon: 3, title: '提示' }, function (index) {
            //    清空token
            localStorage.removeItem('token')
            // 返回到登陆页面
            location.href = '/login.html'
            layer.close(index);
        });
    })
})



// 获取用户基本信息
function getUserMsg() {
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            renderUserMsg(res)
        }
    })
}

// 渲染用户名及头像
function renderUserMsg(res) {
    let name = res.data.nickname || res.data.username
    $('#welcome span').text(name)
    if (res.data.user_pic) {
        $('.text-avatar').hide()
        $('.userInfo img').prop('src', res.data.user_pic).show()
    } else {
        $('.userInfo img').hide()
        $('.text-avatar').text(name[0].toUpperCase()).show()
    }
}