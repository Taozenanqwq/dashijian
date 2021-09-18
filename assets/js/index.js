$(function() {
    // $('.mod').hide();
    getUserInfo();
    $('#quit').on('click', function() {
        layer.confirm('确认退出?', { icon: 3, title: '提示' }, function(index) {
            localStorage.removeItem('token');
            location.href = './login.html';
            layer.close(index);
        });

    })



})

function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        method: 'GET',
        success: function(data) {
            if (data.status !== 0) {
                layer.msg('获取用户信息失败！')
            } else {
                data = data.data
                renderAvatar(data);
            }
        },


    })
}

function renderAvatar(user) {
    let name = user.nickname || user.username
    $('#welcome').html('欢迎，' + name).show();
    $('.name').html(name).show();
    if (!user.user_pic) {
        $('.textavatar').html(name[0].toUpperCase()).css('display', 'inline-block')
    } else {
        $('.avatar').attr('src', user.user_pic).show();
    }

}