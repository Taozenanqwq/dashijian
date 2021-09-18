$(function() {
    $('#editpwd').on('submit', function(e) {
        e.preventDefault();
        console.log(1);
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                if (!res.status) {
                    layer.msg('修改成功！')
                } else {
                    layer.msg('修改失败！');
                }
            }
        })
    })
})