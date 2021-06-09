$(function () {
    $('#link_reg').on('click', function () {
        $('#registerBox').show()
        $('#loginBox').hide()
    })
    $('#link_login').on('click', function () {
        $('#registerBox').hide()
        $('#loginBox').show()
    })

    // 从layui中获取form对象
    let form = layui.form
    let layer = layui.layer
    form.verify({
        username: [/^[\da-zA-Z]{1,15}$/, '用户名必须为1-15位,且是数字和字母组合'],
        // 自定义名为pwd的校验规则
        pwd: [/^\S{6,12}$/, '密码必须为6-12位,且是非空字符串'],
        repwd: function (value) {
            if (value != $('#registerBox input[name="password"]').val()) {
                return '两次输入密码不一样'
            }
        }
    })

    // 添加注册功能
    $('#regForm').on('submit', function (e) {
        e.preventDefault()
        let data = {
            username: $('#regForm input[name="username"]').val(),
            password: $('#regForm input[name="password"]').val()
        }
        $.ajax({
            type: 'POST',
            url:  '/api/reguser',
            data: data,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                $('#link_login').click()
            }
        })
    })

    // 添加登录功能
    $('#loginForm').on('submit', function (e) {
        e.preventDefault()
        // let data = {
        //     username: $('#loginForm input[name="username"]').val(),
        //     password: $('#loginForm input[name="password"]').val()
        // }
        let data = $(this).serialize()
        console.log(data);
        $.ajax({
            type: 'POST',
            url:  '/api/login',
            data: data,
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                localStorage.setItem('token',res.token)
                location.href = '/index.html'
            }
            
        })
    })
})