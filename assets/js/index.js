$(function() {
    getUserInfo() //调用getUserInfo函数获取用户的基本信息
    var layer = layui.layer
    $('#tuichu').on('click', function() {

        layer.confirm('是否退出登录?', { icon: 3, title: '退出登录' }, function(index) {
            //do something
            localStorage.removeItem('token')
            location.href = "/login.html"
            layer.close(index)
        })
    })
})

//获取用户的基本信息
function getUserInfo() {
    $.ajax({
        type: "GET",
        url: "/my/userinfo",
        success: function(res) {
            if (res.status != 0) {
                return layui.layer.msg(res.message)
            }
            renderAvatar(res.data) //如果返回成功调用函数渲染用户头像
        }
    })
}

//渲染用户头像
function renderAvatar(user) {
    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    if (user.user_pic != null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()

    } else {
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
        $('.layui-nav-img').hide()
    }
}