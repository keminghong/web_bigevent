$(function() {

    $('#link_reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link_login').on('click', function() {
        $('.reg-box').hide()
        $('.login-box').show()
    })

    // 从layui中获取form对象
    var form = layui.form
    var layer = layui.layer
        // 通过form.verify（）自定义校验规则
    form.verify({
        // 方式一：数组，只能有一条规则
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        // 方式二：函数，可以有多条，规则和校验方式丰富
        repwd: function(value) {
            var repwd = $('.reg-box [name=password]').val() //通过name属性取值
            if (repwd != value) {
                return '两次密码不一致'
            }
        }
    })

    //监听注册表单的提交事件
    $('#form_reg').on('submit', function(e) {
        e.preventDefault()
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        $.post('/api/reguser', data, function(res) {
            if (res.status != 0) {
                return layer.msg(res.message)
            }
            layer.msg(res.message + '请登录')
            $('#link_login').click()
        })
    })

    //监听登录表单的提交事件
    $('#form_login').on('submit', function(e) {
        e.preventDefault()

        $.ajax({
            type: "POST",
            url: "/api/login",
            data: $(this).serialize(),

            success: function(res) {
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                console.log(res.token)
                localStorage.setItem('token', res.token)
                location.href = "/index.html"
            }
        })
    })
})