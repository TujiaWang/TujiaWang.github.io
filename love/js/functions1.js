var $window = $(window),
    gardenCtx, gardenCanvas, $garden, garden;
var clientWidth = $(window).width();
var clientHeight = $(window).height();

$(function() {
    // setup garden
    $loveHeart = $("#loveHeart");
    var offsetX = $loveHeart.width() / 2;
    var offsetY = $loveHeart.height() / 2 - 55;
    $garden = $("#garden");
    gardenCanvas = $garden[0];
    gardenCanvas.width = $("#loveHeart").width();
    gardenCanvas.height = $("#loveHeart").height()
    gardenCtx = gardenCanvas.getContext("2d");
    gardenCtx.globalCompositeOperation = "lighter";
    garden = new Garden(gardenCtx, gardenCanvas);

    // $("#content").css("width", $loveHeart.width() + $("#code").width());
    // $("#content").css("height", Math.max($loveHeart.height(), $("#code").height()));
    // $("#content").css("margin-top", Math.max(($window.height() - $("#content").height()) / 2, 10));
    // $("#content").css("margin-left", Math.max(($window.width() - $("#content").width()) / 2, 10));

    // renderLoop
    setInterval(function() {
        garden.render();
    }, Garden.options.growSpeed);
});

$(window).resize(function() {
    var newWidth = $(window).width();
    var newHeight = $(window).height();
    if (newWidth != clientWidth && newHeight != clientHeight) {
        location.replace(location);
    }
});

function getHeartPoint(angle) {
    var t = angle / Math.PI;
    var x = 19.5 * (16 * Math.pow(Math.sin(t), 3));
    var y = -20 * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
    return new Array(offsetX + x, offsetY + y);
}

function startHeartAnimation() {
    var interval = 50;
    var angle = 10;
    var heart = new Array();
    var animationTimer = setInterval(function() {
        var bloom = getHeartPoint(angle);
        var draw = true;
        for (var i = 0; i < heart.length; i++) {
            var p = heart[i];
            var distance = Math.sqrt(Math.pow(p[0] - bloom[0], 2) + Math.pow(p[1] - bloom[1], 2));
            if (distance < Garden.options.bloomRadius.max * 1.3) {
                draw = false;
                break;
            }
        }
        if (draw) {
            heart.push(bloom);
            garden.createRandomBloom(bloom[0], bloom[1]);
        }
        if (angle >= 30) {
            clearInterval(animationTimer);
            showMessages();
        } else {
            angle += 0.2;
        }
    }, interval);
}

(function($) {
    $.fn.typewriter = function() {
        this.each(function() {
            var $ele = $(this),
                str = $ele.html(),
                progress = 0;
            $ele.html('');
            var timer = setInterval(function() {
                var current = str.substr(progress, 1);
                if (current == '<') {
                    progress = str.indexOf('>', progress) + 1;
                } else {
                    progress++;
                }
                $ele.html(str.substring(0, progress) + (progress & 1 ? '_' : ''));
                if (progress >= str.length) {
                    clearInterval(timer);
                    heart();
                }
            }, 75);
        });
        return this;
    };
})(jQuery);

function timeElapse(date) {
    var current = new Date();
    var seconds = (Date.parse(current) - Date.parse(date)) / 1000;
    var days = Math.floor(seconds / (3600 * 24));
    seconds = seconds % (3600 * 24);
    var hours = Math.floor(seconds / 3600);
    if (hours < 10) {
        hours = "0" + hours;
    }
    seconds = seconds % 3600;
    var minutes = Math.floor(seconds / 60);
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    seconds = seconds % 60;
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    var result = "<span class=\"digit\">" + days + "</span> days <span class=\"digit\">" + hours + "</span> hours <span class=\"digit\">" + minutes + "</span> minutes <span class=\"digit\">" + seconds + "</span> seconds";
    $("#elapseClock").html(result);
}

function showMessages() {
    adjustWordsPosition();
    $('#messages').fadeIn(5000, function() {
        showLoveU();
    });
}

function adjustWordsPosition() {
    $('#words').css("position", "absolute");
    $('#words').css("top", $("#garden").position().top + 195);
    $('#words').css("left", $("#garden").position().left + 70);
}

function adjustCodePosition() {
    // $('#code').css("margin-top", ($("#garden").height() - $("#code").height()) / 2 - 110);
}

function showLoveU() {
    $('#loveu').fadeIn(3000);
}

function heart() {
    var canvas = document.querySelector('#heart');
    var context = canvas.getContext('2d');
    // 画布的宽度
    var width = parseInt(window.getComputedStyle(canvas).width);
    // 画布的高度
    var height = parseInt(window.getComputedStyle(canvas).height);
    // 线开始的颜色
    var startColor = 'rgba(255,255,255,0.7)';
    // 线结束的颜色
    var endColor = 'rgba(255,0,0,1)';
    // 线阴影的颜色
    var shadowColor = 'rgba(255,255,255,0.5)';
    // 保存所有点的坐标的数组
    var pointArr = [];
    // 设置 画布的宽度
    canvas.width = width;
    // 设置 画布的高度
    canvas.height = height;
    context.lineWidth = 3;
    // 将画布的原点（0,0），移动到中间
    // 移动原点是为了能让整个心形显示出来
    context.translate(width / 2, height / 2);

    // 得到心形线上的所有点的坐标的函数
    function heartArr() {
        // t 代表弧度
        var t = -Math.PI + 0.5;
        // maxt 代表 t 的最大值
        var maxt = 2 * Math.PI - 1;
        // vt 代表t的增量
        var vt = 0.1;
        // 需要循环的次数
        var maxi = Math.ceil(maxt / vt);
        // x 用来暂时保存每次循环得到的 x 坐标
        var x = 0;
        // y 用来暂时保存每次循环得到的 y 坐标
        var y = 0;
        // 控制心形大小
        var size = 10;
        for (var i = 0; i <= maxi; i++) {
            // x=16 * (sin(t)) ^ 3;
            x = 16 * Math.pow(Math.sin(t), 3);
            // y=13 * cos(t) - 5 * cos(2 * t) - 2 * cos(3 * t) - cos(4 * t)
            y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
            t += vt;
            pointArr.push([x * size, -y * size]);
        }
    }

    // lineArr 暂时保存折线上的点的坐标
    var lineArr = [];
    // brokenLine 函数用来得到折线上所有点的坐标
    // x 表示折线上的点 每次改变的x坐标
    // maxX 表示 x 的最大值
    // y 表示 折线的 y坐标
    // startX 和 endX 表示会在这两个数范围内产生折线
    function brokenLine(x, maxX, y, startX, endX) {
        if (x > maxX) {
            return;
        }

        if (x > startX && x < endX) {
            if (Math.random() > 0.8) {
                lineArr.push([x, randomNum(y + 60, y - 90)]);
            } else {
                lineArr.push([x, y]);
            }
        } else {
            lineArr.push([x, y]);
        }

        x += randomNum(5, 10);
        brokenLine(x, maxX, y, startX, endX);
    }

    // 返回 from 和 to 之间的一个随机数
    function randomNum(from, to) {
        var Range = to - from;
        var num = from + Math.round(Math.random() * Range);
        return num;
    }


    // 获取所有点的坐标，包括心形线 和 折线
    function getpointArr() {
        // 得到心形线上的所有点的坐标
        heartArr();

        // 获取左边线折线的坐标
        var x = -width / 2;
        var maxX = pointArr[0][0];
        var y = pointArr[0][1];
        var startX = maxX - (maxX - x) * 0.8;
        var endX = maxX - (maxX - x) * 0.2;
        brokenLine(x, maxX, y, startX, endX);
        pointArr.unshift(...lineArr);

        // 获取右边线折线的坐标
        x = pointArr[pointArr.length - 1][0];
        maxX = width / 2;
        y = pointArr[pointArr.length - 1][1];
        startX = maxX - (maxX - x) * 0.8;
        endX = maxX - (maxX - x) * 0.2;
        lineArr = [];
        brokenLine(x, maxX, y, startX, endX);
        pointArr.push(...lineArr);
    }
    getpointArr();

    var index = 0;
    var index2 = 0;
    // 控制两种颜色的间隔，值越大，第一种颜色越明显
    var interval = 3;
    // 画一条线的函数
    function drawLine(index) {
        var x1 = pointArr[index][0];
        var y1 = pointArr[index][1];
        var x2 = pointArr[index + 1][0];
        var y2 = pointArr[index + 1][1];
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.stroke();
    }
    // 根据点的坐标，画出心形线,产生动画效果
    function draw() {
        /* index2 > pointArr.length - 2 + interval 时
        说明两种颜色的线都画完了，结束函数
        */
        if (index2 > pointArr.length - 2 + interval) {
            return;
        }
        context.lineJoin = "round";
        context.lineCap = "round";
        context.shadowBlur = 20;
        context.shadowColor = shadowColor;

        // 当index2 >= interval 时开始画第二种颜色的线
        if (index2 >= interval) {
            context.beginPath();
            context.strokeStyle = endColor;
            drawLine(index2 - interval);
        }

        /*
        index > pointArr.length - 2 时
        说明第一种颜色的线已经画完了，
        之后只画第二种颜色的线
        */
        if (index > pointArr.length - 2) {
            index2++;
            window.requestAnimationFrame(draw);
            return;
        }

        context.beginPath();
        context.strokeStyle = startColor;
        drawLine(index);

        index++;
        index2++;
        window.requestAnimationFrame(draw);
    }
    window.requestAnimationFrame(draw);
}
