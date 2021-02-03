$.ajaxPrefilter(function(options) {
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url

    if (options.url.indexOf('/my/') != -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }

        options.complete = function(res) {
            if (res.responseText.status === 1 && res.responseText.message === '身份认证失败！') {
                localStorage.removeItem('token')
                location.href = "/login.html"
            }

        }
    }

})