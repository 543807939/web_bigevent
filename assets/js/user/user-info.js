$(function () {
    let form = layui.form
    form.verify({
        username: [/^[\da-zA-Z]{1,15}$/, '用户名必须为1-15位,且是数字和字母组合'],
        nickname:[/^\S{1,8}$/,'昵称应为1-8位非空字符'],
        // 自定义名为pwd的校验规则
        pwd: [/^\S{6,12}$/, '密码必须为6-12位,且是非空字符串'],
        email:[/^[\da-zA-Z]{3,14}@[\da-zA-Z]{1,4}.[\da-zA-Z]{1,4}$/,'请输入正确的邮箱地址']
    })
})