$(function() {
    // 登录注册表单切换
    $('.login span').on('click', () => {
        $('.login').toggleClass('hide');
        $('.reg').toggleClass('hide');
    })
    $('.reg span').on('click', () => {
        $('.login').toggleClass('hide');
        $('.reg').toggleClass('hide');
    })

    // 定义校验规则
    const form = layui.form
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须为6-12位且不能出现空格'],
        confirm_pwd: function(value, item) {
            if (!new RegExp("^[\\S]{6,12}$").test(value)) {
                return "密码必须为6-12位且不能出现空格"
            }
            if (value !== $('input[name="password"]').val()) {

                return "两次输入的密码不一致"
            }
        },
        username: function(value, item) { //value：表单的值、item：表单的DOM对象
            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                return '用户名不能有特殊字符';
            }
            if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                return '用户名首尾不能出现下划线\'_\'';
            }
            if (/^\d+\d+\d$/.test(value)) {
                return '用户名不能全为数字';
            }
        }
    })

    // 注册请求
    const layer = layui.layer
    const base = 'http://api-breakingnews-web.itheima.net'
    $('.reg').on('submit', () => {
            event.preventDefault();
            const data = $('.reg').serialize();
            $.post(base + '/api/reguser', data, (res) => {
                if (res.status) {
                    layer.msg(res.message);
                } else {
                    layer.msg('注册成功', {
                        icon: 1,
                        time: 1000 //2秒关闭（如果不配置，默认是3秒）
                    }, function() {
                        $('.reg').children('span').click();
                    });
                }
            })

        })
        // 登录请求
    $('.login').on('submit', () => {
        event.preventDefault();
        const data = $('.login').serialize();
        console.log(1);
        $.post(base + '/api/login', data, (res) => {
            if (res.status) {
                layer.msg(res.message);
            } else {
                localStorage.setItem('token', res.token)
                location.href = './index.html';
            }
        })

    })

})