$(function () {
    $(".nav-item").on("mouseover", function () {
        console.log(1);
        $(this).children("a").children(".bottom_border").stop().fadeToggle();
        $(this).children(".nav-child").stop().toggle();
    })

    $(".nav-tree li").on("click", function () {
        if ($(this).children("dl").is(':visible')) {
            $(this).children("dl").hide();

        } else {
            $(this).children("dl").show();
            $(this).addClass("chosen");
            $(this).siblings("li").removeClass("chosen")
            $(this).siblings("li").children("dl").hide();
        }
    })
    $(".offBtn").on("click", function () {
        out();
    })
    getUserInfo();
    function getUserInfo() {
        $.ajax({
            methods: "get",
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return console.log("获取失败");
                }
                console.log(res.data);
                renderAvater(res.data);

            },
        })
    }

    function renderAvater(user) {
        var name = user.nickname || user.username;
        $("#welcome").html("欢迎  " + name)
        if (user.pic != null) {
            $(".pic_img").attr("src", user.pic).show();
            $(".text-avater").hide();
        } else {
            $(".pic_img").hide();
            var first = name[0];
            $(".text-avater").html(first);
        }
    }

    function out() {
        var message = "确定退出吗？"
        if (confirm(message) === true) {
            localStorage.removeItem("token");
            location.href = '/login.html';
        }
        else {
            return
        }

    }

})