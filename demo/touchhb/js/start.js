 (function() {
    var IS_ONLINE = window.DEV_MODE == 'ONLINE';
    var MOD_CACHE = "20150714a";
    var list = [],
        timestamp = +new Date;
    var versions = {
        "app.js": "20150714d",
        "index.js": "20150724",
        "game.js": "20150715"
    };
    for (var p in versions) {
        list.push([p, p.replace(".js", "") + (IS_ONLINE ? "-min" : "") + ".js"]);
    }
    seajs.config({
        base: window.location.origin+'/'+window.location.pathname.split('index.html')[0]+"/js",
        map: list
    });
})();

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = location.search.substr(1).match(reg);
    if (r != null) return unescape(decodeURI(r[2]));
    return null;
}

function addShareCount() {
    var shareUserId = localStorage.getItem("needAddShareCount");
    if (null != shareUserId && 0 != shareUserId) {
        localStorage.setItem("needAddShareCount", 0);
    }
}

function subShareCount(minusNum) {
    if (null != currentUser && 0 != currentUser) {}
}

var TUI_GUANG_NUM = 100;
var fromUser = getFromUser();
var currentUser = getCurrentUser();
document.write("<script src='js/luckynum.js'><\/script>");
$(function() {
    getLuckyNum();
    addShareCount();

    if (0 == fromUser) {} else {
        $("#game_first").removeClass("hide");
    }

    seajs.use([ 'app.js','game.js'], function(app,logic) {
        app.init(function() {
            logic.init();
        });
    });
});

function getFromUser() {
    if (null == getTuiguangChannel()) {
        setTuiguangChannel(getQueryString("channel"));
    }
    var fromUser = localStorage.getItem("fromUser");
    if (1 == getQueryString("fromGZH") && 0 != fromUser) {
        localStorage.setItem("needAddShareCount", fromUser);
        fromUser = 0;
        localStorage.setItem("fromUser", fromUser);
    }
    if (null == fromUser) {
        fromUser = getQueryString("userId");
        if (null == fromUser) {
            fromUser = 0;
        }
        localStorage.setItem("fromUser", fromUser);
        localStorage.setItem("needAddShareCount", fromUser);
        fromUser = 0;
        localStorage.setItem("fromUser", fromUser);
    }
    return fromUser;
}

function getCurrentUser() {
    var currentUser = localStorage.getItem("curUser");
    if (null == currentUser || "" == currentUser) {
        currentUser = parseInt(Date.now() + Math.random() * 100000000000);
        localStorage.setItem("curUser", currentUser);
    }
    if (currentUser != getQueryString("userId")) {
        var randomInt = parseInt(Math.random() * TUI_GUANG_NUM);
        var channel = randomInt;
        //            window.location.href = 'index.html?userId='+currentUser+'&channel='+channel;
    }
    return currentUser;
}

function getLuckyNum() {
    var luckyNum = localStorage.getItem("luckyNum");
    if (null == luckyNum || "" == luckyNum) {
        luckyNum = 3;
        setLuckyNum(luckyNum);
    }
    if (null != serverLuckNum) {
        luckyNum = parseInt(luckyNum) + parseInt(serverLuckNum);
        setLuckyNum(luckyNum);
        subShareCount(serverLuckNum);
        serverLuckNum = null;
    }
    return parseInt(luckyNum);
}

function setLuckyNum(luckyNum) {
    if (null != luckyNum) {
        localStorage.setItem("luckyNum", luckyNum);
        $.localStorage.setItem("money0713_share_time", luckyNum);
    }
}

function getTotalMoney() {
    var totalMoney = localStorage.getItem("totalMoney");
    if (null == totalMoney || "" == totalMoney) {
        totalMoney = 0;
        localStorage.setItem("totalMoney", totalMoney);
    }
    totalMoney = parseFloat(totalMoney).toFixed(2);
    return totalMoney;
}

function setTotalMoney(totalMoney) {
    if (null != totalMoney) {
        localStorage.setItem("totalMoney", totalMoney);
    }
}

function setTuiguangChannel(tuiguangChannel) {
    if (null != tuiguangChannel) {
        localStorage.setItem("tuiguangChannel", tuiguangChannel);
    }
}

function getTuiguangChannel() {
    return localStorage.getItem("tuiguangChannel");
}