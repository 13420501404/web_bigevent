$(function() {
    getUserInfo()

    $("#btnLogout").on('click', function() {
        layui.layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
            //do something
            localStorage.removeItem('token')
            location.href = '/login.html'
            layer.close(index);
        });
    })


})

function renderAvatar(user) {
    var name = user.nickname || user.username
    $('#welcome').html("欢迎&nbsp;&nbsp;" + name)
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        var first = name.charAt(0).toUpperCase()
        $('.text-avatar').html(first).show()
        $('.layui-nav-img').hide()

    }
}

function getUserInfo() {
    $.ajax({
        methods: 'get',
        url: '/my/userinfo',
        success: function(res) {
            if (res.status !== 0) return layui.layer.msg(res.message)
            renderAvatar(res.data)
        },
    })
}