// JavaScript Document
"use strict";
(function() {
    var ua = navigator.userAgent.toLowerCase();
    var isiPad = ua.indexOf('ipad') > -1 || ua.indexOf('iphone') == -1 && ua.indexOf('ipod') == -1 && ua.indexOf('macintosh') > -1 && 'ontouchend' in document;

    if ((isiPad) ||
        ((ua.indexOf("android") != -1) && (ua.indexOf("mobile") == -1))) {
        document.write('<meta name="viewport" content="width=1024">');
    } else {
        document.write('<meta name="viewport" content="width=device-width">');
    }
})();