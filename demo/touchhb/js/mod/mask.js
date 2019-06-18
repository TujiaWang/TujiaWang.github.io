/**
 * 页面遮盖层
 * @author slarkzhang
 * @date 2014.8.5
*/

define('mod/mask', [], function(require, exports, module){
    var css_text = ['.pop-mask{position:absolute;left:0;top:0;width:100%;height:100%;z-index:999;background:transparent;}'].join("");

    var html_text = ['<div class="pop-mask hide" id="mod_mask_pop"></div>'].join("");

    /**
     * 检查页面是否已经插入了样式和HTML结构
     * @method checkDomExist
     */
    var _checkDomExist = function(){
        var cssNode = $("#css_mask_pop");
        if(cssNode.length == 0){
            $('head').append($('<style type="text/css" id="css_mask_pop">' + css_text + '</style>'));
        }

        var htmlNode = $("#mod_mask_pop");
        if(htmlNode.length == 0){
            $("body").append($(html_text));
        }
    }

    _checkDomExist();

    var _showMask = function(){
        $('#js_pop_mask').removeClass('hide');
    }

    var _hideMask = function(){
        $('#js_pop_mask').addClass('hide');
    }

    return {
        showMask : _showMask,
        hideMask : _hideMask
    }
})

