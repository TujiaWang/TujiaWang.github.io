var total = new Array(3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);

function GetRandomNum(Min, Max) {
	var Range = Max - Min;
	var Rand = Math.random();
	return(Min + Math.round(Rand * Range));
}

function GetRequest() {

	var url = location.search;

	var theRequest = new Object();

	if(url.indexOf("?") != -1) {

		var str = url.substr(1);

		strs = str.split("&");

		for(var i = 0; i < strs.length; i++) {

			theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);

		}

	}

	return theRequest;

}

var req_params = GetRequest();

$(document).ready(function() {

	setInterval(function() {

		var frist_li_idx = $("#pst_1 li:first");

		var c_li = frist_li_idx.clone();

		frist_li_idx.animate({

			"marginTop": "-48px",

			"opacity": "0"

		}, 600, function() {

			$(this).remove();

			$("#pst_1").append(c_li);

		});

	}, 2000);

	$("#pst_scroll").animate({
		"marginTop": "-54px"
	}, 'normal', function() {
		$("#pst_1 li:first").appendTo("#pst_1");
	});
});

// 滚动代码
var screenWidth = $(window).width();
$(document).ready(function() {
	$('.lotteryBg').height(screenWidth);
	$('#run').css({
		'width': screenWidth * 153 / 520,
		'height': screenWidth * 214 / 520,
		'margin-left': -screenWidth * 153 / 520 / 2,
		'margin-top': -screenWidth * 214 / 520 / 2
	});
	$('#btn_run').css({
		'width': screenWidth * 125 / 520,
		'height': screenWidth * 125 / 520,
		'margin-left': -screenWidth * 125 / 520 / 2,
		'margin-top': -screenWidth * 125 / 520 / 2
	});

})

// var timestamp = new Date().getTime();
// var b = new Base64();
// var url = '<{$tpl_shareUrl}>';
// if (getCookie("chai2")) {
//     var title = '我已领到' + getCookie("bmdj_title");
//     var desc = '确实到手，你也来一起领取吧，抢到就是赚到！';
//     var image = '' + getCookie("bmdj_img1") + '?11212';

// } else {
//     var title = '王者荣耀福利到！一起抢皮肤';
//     var desc = '限定皮肤，海量奖励！快快点击一起抢夺吧！';
//     var image = 'https://imgcache.gtimg.cn/vipstyle/game/act/pagemaker_shine/1490930330393/ICON.png';
// }
// var basetitle = b.encode(title);
// var basedesc = b.encode(desc);
// var baseimage = b.encode(image);
// var baseurl = b.encode(url);

// function share() {
//     if (getCookie("chai2")) {
//         setCookie("chai2", ++nn);
//     } else {
//         setCookie("chai2", 1);
//     }
//     window.parent.frames.location.href = "mqqapi://share/to_fri?file_type=news&src_type=web&version=1&generalpastboard=1&share_id=1105471055&url=" + baseurl + "&previewimageUrl=" + baseimage + "&image_url=" + baseimage + "&title=" + basetitle + "&description=" + basedesc + "&callback_type=scheme&thirdAppDisplayName=UVE=&app_name=UVE=&cflag=0&shareType=0";
// }

// function lingqu() {
//     // setTimeout(function() {
//     //     $('#lllq').hide();
//     //     $('#lqts').show();
//     // },
//     // 500);
//     alert('dsfdsf');
// } 
// function lqts() {
//     setCookie("gztz", 1);
//     location.href = "http://pvp.qq.com/m/";
// }