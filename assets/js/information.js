$(function() {
    init();
    layui.use('form', function() {
        var form = layui.form;

        //监听提交
        form.on('submit', function(data) {
            editInfo();
            return false;
        });
    });
    $('#reset').on('click', () => init())
})

function init() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        success: function(res) {
            if (!res.status) {
                // console.log(res.data);
                var form = layui.form;
                form.val('userInfo', res.data);
                $('[name="username"]').attr('data-id', res.data.id)
            } else {
                layer.msg('请求失败！')
            }
        }
    })
}

function editInfo() {
    let id = $('[name="username"]').attr('data-id');
    let nickname = $('[name="nickname"]').val();
    let email = $('[name="email"]').val();
    $.ajax({
        method: 'POST',
        url: '/my/userinfo',
        data: { id: id, nickname: nickname, email: email },
        success: function(res) {
            if (!res.status) {
                init();
                layer.msg(res.message);
                window.parent.getUserInfo();
                window.parent.home.click();
            } else {
                layer.msg('修改失败！')
            }
        }
    })
}