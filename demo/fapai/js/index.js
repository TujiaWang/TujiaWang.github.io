navigator.userAgent.toLowerCase().match(/iphone|ipad/gi) ? $(".apple").show() : $(".apple").hide();
new IScroll("#prize-list", {
    scrollX: true,
    scrollY: false,
    mouseWheel: false,
    scrollbars: true,
    shrinkScrollbars: "clip",
    fadeScrollbars: false,
    click: true
});

// 首页推荐的关闭按钮
$('#recommend-modal .close').click(function() {
    $("#recommend-modal").hide().remove();
    load();
});

var n = null;
var i = null;
// 显示游戏规则按钮
$(".rule").on("click", function() {
    $(".rule-modal").show();
    n = new IScroll(".description", {
        mouseWheel: !0,
        scrollbars: !0,
        shrinkScrollbars: "scale",
        click: !0
    });
    $("#db-content").addClass("filter");
    document.ontouchmove = function(t) {
        t.preventDefault()
    }
});
// 规则说明中的关闭按钮
$(".rule-modal .close").on("click", function() {
    $(".rule-modal").hide();
    $("#db-content").removeClass("filter");
    document.ontouchmove = null;
    n.destroy();
    $(".probability").hasClass("active") && ($(".probability").removeClass("active"), i.destroy());
});
// 规则中更多概率说明按钮
$(".probability .nav").on("click", function() {
    $(".probability").toggleClass("active");
    $(".probability").hasClass("active") ? i = new IScroll(".probability-wrapper", {
        mouseWheel: !0,
        scrollbars: !0,
        shrinkScrollbars: "scale",
        click: !0
    }) : i.destroy();
    $(".description .iScrollVerticalScrollbar").toggleClass("fade");
});

var s = $(".card"),
    timer1 = null,
    timer2 = null,
    i = 0,
    o = 0;
// 初始化牌子，让叠在一起的牌子展开
function initCard() {
    if (o >= s.length) {
        s.eq(0).addClass("light");
        playCard();
        clearTimeout(timer1);
    } else {
        s.eq(o).removeClass("init");
        o++;
        timer1 = setTimeout(initCard, 300);
    }
}

function load() {
    setTimeout(initCard, 300);
}

// 牌子的循环播放
function playCard() {
    if (i == 6) {
        i = 0;
    }
    s.removeClass("light").eq(i).addClass("light");
    i++;
    timer2 = setTimeout(playCard, 600);
}


// 点击每个牌子事件
$(".card-wrapper").on("click", ".card", function() {
    clearTimeout(timer2);
    gameStart($(this));
    setTimeout(function() {
        gameEnd();
        // 用户中奖

        // 设置中奖显示信息
        // $('.coupon-name span').html();
        // $('.coupon-image img').attr('src', '');

        // 显示中奖面板
        $('.J_modalShowPrize').show();
    }, 800);

});
// 牌子抖动的动画添加
function gameStart(t) {
    $(".card").removeClass("light");
    t.addClass("active");
    $(".card-cover").show();
    t.addClass("shake");
}

function gameEnd() {
    $(".card").removeClass("active shake turn");
    $(".card-cover").hide();
    $(".card").addClass("init");
}

// 翻牌子后的马上使用按钮
$(".J_modalShowPrize .J_btnCoupon").on("click", function() {

});
// 翻牌子后的关闭按钮
$(".J_modalShowPrize .coupon-modal-close").on("click", function() {
    document.touchmove = null;
    $(".J_modalShowPrize").hide();
    i = 0;
    o = 0;
    load();
});
// 翻牌子后的广告连接跳转
$(".J_gotoDetail").on("click", function(e) {
    e.preventDefault();
    window.location.href = '';
});
$('.dealer').click(function() {
    console.log('dsfdsfdsfdsfdsfdsfdsfds');
});

$("#prize-list").on("click", ".prize-item", function() {
    $("#db-content").addClass("filter-blur");
    $(".prize-detail-modal").addClass("show");
    $(".prize-detail-loading").show();
    $(".prize-detail-modal").show();
    setTimeout(function() {
        $(".prize-detail-loading").hide();
        $('.prize-detail-slidebox').show();
        new IScroll(".prize-detail-slidebox", {
            mouseWheel: true,
            scrollbars: true,
            shrinkScrollbars: "scale",
            click: true
        });
    }, 300);

});

$(".prize-detail-slideup").on("click", function() {
    $(".prize-detail-modal").removeClass("show");
    setTimeout(function() {
        $(".prize-detail-modal").hide();
    }, 300);
    $("#db-content").removeClass("filter-blur");
});