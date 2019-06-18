window.iRotate = (function(w,d){
    var Tween = {linear: function (t, b, c, d){return c*t/d + b;},easeOut: function(t, b, c, d){return -c *(t/=d)*(t-2) + b;}},
    _raf = window.requestAnimationFrame || window.webkitRequestAnimationFrame,_craf = window.cancelAnimationFrame || window.webkitCancelAnimationFrame;
    function R(obj,json){
        this.obj = (typeof obj=='object') ? obj : d.querySelector(obj);
        this.startTime = Date.now();
        this.json = json;
        this.step = null;
        this.times = json['time'] || 1000;
        _raf(this.rotate.bind(this))
    };
    R.prototype = {
        rotate : function(){
            var changeTime = Date.now(),t = this,
            tm = t.times - Math.max(0,t.startTime - changeTime + t.times),
            value = Tween[t.json['easing'] || 'easeOut'](tm,+t.json['start'] || 0,t.json['end'] - (+t.json['start'] || 0),t.times);
            t.obj.style['transform'] = t.obj.style['-webkit-transform'] = 'rotate('+value%360+'deg)';
            t.obj.setAttribute('data-rotate',value%360)
            if(tm==t.times) (_craf(t.step),t.json.callback && t.json.callback.call(t.obj))
            else t.step = _raf(t.rotate.bind(this)) ;
        },
        stop : function(fn){
            _craf(this.step);
            fn && fn.call(this.obj)
        }
    };
    return R;
})(window,document);


var _rotate = new iRotate('#div',{
    start : 0,   //开始角度，可不写，默认0
    end :45,  //结束角度
    time :5000, //持续时间，可不写，默认1000
    easing : 'easeOut', //动画形式，目前只有'linear'和'easeOut'两种，可不写，默认'easeOut'
    callback : function(){ //回调函数
        //this为当前对象
    }
});
_rotate.stop(function(){ //停止回调函数
    //this为当前对象
});