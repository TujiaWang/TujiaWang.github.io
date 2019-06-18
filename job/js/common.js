//全站公共js库
$(document).ready(function(e) {
	var options = {
            color: '#42b8f1',
            strokeWidth: 5,
            trailWidth: 4,
            duration: 800,
            text: {
                autoStyleContainer: false
            },
            from: { color: '#42b8f1', width: 5 },
            to: { color: '#42b8f1', width: 5 },
            step: function(state, circle) {
                circle.path.setAttribute('stroke', state.color);
                circle.path.setAttribute('stroke-width', state.width);

                var value = Math.round(circle.value() * 100);
                if (value === 0) {
                  circle.setText('');
                } else {
                  circle.setText(value + '%');
                }

            }
        };

        $('.progress').each(function(index,el){
        // console.log(el);
            var bar = new ProgressBar.Circle(el, options);
            bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
            bar.text.style.fontSize = '30px';
            bar.animate($(el).attr('data-progress'));  
        });
	<!--设置案例宽度-->
	var len = $("#js_wrap_case").children().length;
	$("#js_wrap_case").css({"width":len*1000});
	
	<!--切换案例-->
	$("#js_tips span").hover(function(){
		var index = $(this).index();
		$(this).addClass("focus").siblings().removeClass("focus");
		
		
		$("#js_wrap_case").children().eq(index).addClass("focus").siblings().removeClass("focus");
		
		var index = $(this).index();
		$("#js_wrap_case").css({
			"left": -index*1000
		});
		console.log()
	});
	
	$(function(){
		$('#js_fullpage').fullpage({
			slidesColor: ['#212325', '#fff', '#212325', '#ebfbff', '#ebfbff'],
			anchors: ['page1', 'page2', 'page3', 'page4', 'page5'],
			menu: '#menu',
			afterRender:function(){
				$('#js_fullpage').find(".active").addClass("focus");
			},
			afterLoad:function(anchorLink ,index){ // 滚动结束后
				$('#js_fullpage').children().eq(index-1).addClass("focus");
			},
			onLeave:function(anchorLink ,index){ // 滚动前
				$('#js_fullpage').children().removeClass("focus");
			}
		});
	});
	
	
    //section的首尾增加选择器
    $(".section").each(function(index, element) {
        $(this).children().first().addClass("first");
		$(this).children().last().addClass("last");
    });
});

var common = {
	//返回浏览器宽高
	getViewSize : function (){
		var de=document.documentElement;
		var db=document.body;
		var viewW=de.clientWidth==0 ? db.clientWidth : de.clientWidth;
		var viewH=de.clientHeight==0 ? db.clientHeight : de.clientHeight;
		/* 
			返回一个数组参数，第一个是浏览器宽度，第二个是浏览器宽度
			调用方法：
			var screenW = getViewSize()[0]; // 浏览器宽度
			var screenH = getViewSize()[1]; // 浏览器高度
		*/
		return Array(viewW,viewH);
	},
	
	//基于当前界面的水平垂直居中
	vhCenter : function (para){
		var screenW = $(para).parent().width(); // 浏览器宽度
		var screenH = $(para).parent().height(); // 浏览器高度
		
		var paraW = $(para).width(); // 元素宽度
		var paraH = $(para).height(); // 元素高度
		
		var scrollTop = $(document).scrollTop(); //浏览器滚动条顶部值
		var scrollLeft = $(document).scrollLeft(); //浏览器滚动条左边距值
		
		var top = 0;
		var left = 0;
		
		//根据浏览器宽高来设定指定容器针对浏览器视图进行居中
		if(screenW < paraW){
			left = 0;
		}else{
			left = (screenW - paraW )/2 + scrollLeft;
		}
		
		if(screenH < paraH){
			top = 0;
		}else{
			top = (screenH - paraH )/2 + scrollTop;
		}
		
		$(para).css({
			"position" : "absolute",
			"left" : left,
			"top" : top
		});
	}
	
}


var xlc = {
	
	//轮播
	tabList : function(container_slide , events , focusClass , autoPlay , autoTime){
		
		/*var defaults = {
			container_slide : // 轮播最外层的div容器
			events : "click", // 指示器切换时的事件
			focuclass : "focus", // 指示器的选中状态class名称
			autoPlay : false, // 是否自动播放
			autoTime : 4000 // 自动播放时间
		}*/
		
		var slideWrap_items = $(container_slide).find(".js_slideWrap"); //轮播焦点容器
		var slideTip = $(container_slide).find(".js_slideTip"); // 轮播指示器容器
		var tabListFn ={
			changeFn : function(index){//切换方法
				// 指示器切换
				slideTip.children().eq(index).addClass(focusClass).siblings().removeClass(focusClass);
				
				//焦点图切换
				slideWrap_items.children().eq(index).stop(true,true).fadeIn().siblings().fadeOut();
				var src = slideWrap_items.children().eq(index).find("a > img").attr("data-imgsrc");
				if(src != "undefined" ){
					slideWrap_items.children().eq(index).find("a > img").attr("src" , src);
				}
			}
		}
		
		//初始化
		//初始化1.选项卡第一个标题增加选中状态
		//初始化2.选项卡对应的第一个内容块显示,其他隐藏
		var index = 0 ; // 用来定位当前显示第几张焦点图
		index = 0 ; // 自动轮播时,会把第一张也计算进去,所以自动的数量从1开始
		slideWrap_items.children().eq(0).show();
		tabListFn.changeFn(0);
		
		
		var itemlen = slideWrap_items.children().length; // 根据焦点图长度来进行第一个和最后一个焦点图时的处理
		var autoPlay = autoPlay; // 如果为true,则自动播放,否则不自动播放
		
		//如果为true则自动播放
		if(autoPlay){
			var picTimer;
			
			//鼠标滑上焦点图时停止自动播放，滑出时开始自动播放
			$(container_slide).hover(function() {
				clearInterval(picTimer);
			},function() {
				picTimer = setInterval(function() {
					tabListFn.changeFn(index);
					index++;
					if(index == itemlen) {index = 0;}
				},autoTime); //autoTime代表自动播放的间隔，单位：毫秒
			}).trigger("mouseleave");
		}
		
		// 上一个
		$(container_slide).find(".js_last").click(function(){
			index--;
			if(index < 0){
				index = itemlen -1 ;
			}
			tabListFn.changeFn(index);
			
		});
		
		// 下一个的切换
		$(container_slide).find(".js_next").click(function(){
			index++;
			if(index >= itemlen){
				index = 0;
			}
			tabListFn.changeFn(index);
			
		});
		
		//鼠标事件,进行切换
		//指示器事件进行相应的切换
		slideTip.children().bind(events ,function(){
			index = $(this).index();
			tabListFn.changeFn(index);
		});
		
	},
	
	//把某个元素变为fixed
	setFixed : function(para,options){
		/*默认参数*/
		var defaultOptions = {
			para : $(para),
			addclassname : "fixed" ,
			parentClass : "isfixed"
		}
		var obj = $.extend(defaultOptions,options);
		_this = obj.para;
		
		obj.para.each(function(){
			var _this = $(this); // 需要固定位置的选择器
			var	_top = parseInt(_this.offset().top); // 获取对象的顶部距离
			var _thisHeight = parseInt(_this.outerHeight()); // 获取对象的高度
			var _parentPaddingTop = parseInt(_this.parent().css("paddingTop")); // 获取父元素的paddingtop
			
			$(window).scroll(function(e) {
				
            	var topScroll = parseInt($(window).scrollTop()); // 滚动时获取浏览器滚动条高度
				if(topScroll > _top){ // 如果滚动条高度大于对象顶部距离,则让对象变成固定定位
					_this.addClass(obj.addclassname);
					_this.parent().addClass(obj.parentClass );
				}else{ // 否则为相对定位
					_this.removeClass(obj.addclassname);
					_this.parent().removeClass(obj.parentClass );
				}
        	});
		});
		
	},
	
	//输入框输入提示
	inputTip :function (){
		var textIpt = $("input[type='text'] , textarea");
		textIpt.each(function(){
			if(!$(this).hasClass("js_notip")){
				$(this).attr("autocomplete","off");
				var value = $(this).val();
				$(this).blur(function(e) {
					if($(this).val() == "" || $(this).val() == " " ){
						$(this).val(value);
					}
				}).focus(function(){
					if($(this).val() == "" || $(this).val() == " " || $(this).val() == value){
						$(this).val("");
					}
				});
			}
		});
	},
	//选项卡切换
	/*
		tabTitle 选项卡容器
		tabContainer 选项卡对应的内容容器
		events 出发切换的事件
		focusClass 选中的class名称
	*/
	tabChange : function(tabTitle , tabContainer , events , focusClass){
		$(tabContainer).children().eq(0).show().siblings().hide(); // 选项卡内容显示第一个,其他隐藏
		$(tabTitle).children().bind(events,function(){ // 切换事件
			var index = $(this).index(); // 获取当前点击的选项卡索引值
			if(focusClass == undefined){
				focusClass = "focus";
			}else{ 
				$(tabTitle).children().eq(index).addClass(focusClass).siblings().removeClass(focusClass); //对应的选项卡添加选中class
			}
			$(tabContainer).children().eq(index).show().siblings().hide(); // 索引值对应的选项卡内容显示,其他隐藏
		});
	},
}