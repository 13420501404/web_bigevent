$(function() {
    $(".reg-box").hide()
    $("#link_reg").on("click", () => {
        $(".reg-box").show()
        $(".login-box").hide()
    })
    $("#link_login").on("click", () => {
        $(".reg-box").hide()
        $(".login-box").show()
    })

    var form = layui.form
    var layer = layui.layer
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位,且不能出现空格!'],

        repwd: function(value) {
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致！'
            }
        }
    })

    $('#form_reg').on('submit', (e) => {
        e.preventDefault()
        var date = {
            username: $('.reg-box [name=username]').val(),
            password: $('.reg-box [name=password]').val(),
        }

        $.post('/api/reguser', date, (res) => {
            if (res.status !== 0) return layer.msg(res.message)
            layer.msg(res.message)
            $("#link_login").click()

        })
    })

    $('#form_login').submit(function(e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'post',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) return layer.msg(res.message)
                layer.msg(res.message)
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })
    })

})