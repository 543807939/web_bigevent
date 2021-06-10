$.ajaxPrefilter(function (options) {
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    // 给所有的函数添加 complete 函数
    options.complete = function (res) {
        if (res.responseJSON.status == 1 && res.responseJSON.message == "身份认证失败！") {
            // 清空token
            localStorage.removeItem('token')
            // 跳回登陆页
            location.href = '/login.html'
        }
    }
})