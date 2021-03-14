$(function () {


    $('.go-res').on('click', function () {
        //点击注册登录界面隐藏,显示注册页面
        $('.login-box').hide();
        $('.res-box').show()
    });
    //点击登录.注册页面隐藏.登录界面显示
    $('.go-login').on('click', function () {

        $('.login-box').show();
        $('.res-box').hide()
    });
    //用户名跟密码校验
    let form = layui.form
    form.verify({
        pw: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        //确认密码验证
        repw: function (value) {
            let val = $('.res-box input[name=password]').val()
            //判断
            if (value != val) {
                return alert('密码不一致')
            }
        }
    })
    //获取注册页面用户信息
    $('#res-form').on('submit', function (e) {
        //阻止默认事件
        e.preventDefault()
        $.ajax({
            url: '/api/reguser',
            type: 'POST',
            data: {
                username: $('.res-box input[name=username]').val(),
                password: $('.res-box input[name=password]').val(),
            },
            success: (res) => {
                console.log(res);
                //判断
                if (res.status != 0) {
                    return layer.msg(res.message, { icon: 5 });
                }
                //注册成功跳转到登录页面,注册页面重置,弹出一个提示注册成功
                layer.msg(res.message, { icon: 6 });
                $('#res-form')[0].reset()
                $('.go-login').click();
            }
        })
    });
    //获取登录页面信息
    $('#login-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            type: 'POST',
            data: $(this).serialize(),
            success: (res) => {
                console.log(res);
                //判断
                if (res.status != 0) {
                    return layer.msg(res.message, { icon: 5 })
                }
                //满足条件,弹出提示登入成功,跳转到首页,本地存储用户身份验证token
                layer.msg('登录成功', { icon: 6 });
                localStorage.setItem('token', res.token);
                location.href = '/index.html'

            }
        })
    })
})