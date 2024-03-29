$(function() {
    layui.form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称长度必须在1~6个字符之间!'
            }
        }
    })
    initUserInfo()

    function initUserInfo() {
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) return layui.layer.msg(res.message)
                layui.form.val('formUserInfo', res.data)
            }
        })
    }

    $('#btnReset').on('click', function(e) {
        e.preventDefault()
        initUserInfo()

    })

    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) return layui.layer.msg(res.message)
                layui.layer.msg(res.message)
                window.parent.getUserInfo()
            }
        })
    })
})