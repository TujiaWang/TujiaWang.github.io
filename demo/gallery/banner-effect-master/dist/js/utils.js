!function(t,e){"undefined"!=typeof module&&module.exports?module.exports=e():"function"==typeof define&&define.amd?define(e):t.Utils=e.call(t)}(this,function(){function t(t,e,n){t.style["Webkit"+e.charAt(0).toUpperCase()+e.substring(1)]=n,t.style["Moz"+e.charAt(0).toUpperCase()+e.substring(1)]=n,t.style["ms"+e.charAt(0).toUpperCase()+e.substring(1)]=n,t.style["O"+e.charAt(0).toUpperCase()+e.substring(1)]=n,t.style[e]=n}function e(t,e){return parseInt(Math.random()*(e-t)+t)}function n(t,e){if(t.length)for(var r=0;r<t.length;r++)n(t[r],e);else for(var r in e)t.style[r]=e[r]}function r(t){return"[object Array]"===Object.prototype.toString.apply(t)}function o(t){return"[object String]"===Object.prototype.toString.apply(t)}function i(t){var e=typeof t;return"function"===e||"object"===e&&!!t}return{setStyle3:t,rnd:e,setStyle:n,isArray:r,isString:o,isObject:i}});