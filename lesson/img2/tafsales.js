function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

if(!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g,'');
  };
}

if(!String.prototype.padStart) {
  String.prototype.padStart = function (targetLength, padString) {
    if(padString === undefined) {
      padString = ' ';
    }
    var s = this;
    while(s.length < targetLength){
      s = '' + padString + s;
    }
    return s;
  };
}

if(!Number.prototype.padStart) {
  Number.prototype.padStart = function (targetLength, padString) {
    if(padString === undefined) {
      padString = ' ';
    }
    var s = '' + this;
    while(s.length < targetLength){
      s = '' + padString + s;
    }
    return s;
  };
}

if(!String.fromCodePoint) {
  (function() {
    var defineProperty = (function() {
      // IE 8 only supports `Object.defineProperty` on DOM elements
      try {
        var object = {};
        var $defineProperty = Object.defineProperty;
        var result = $defineProperty(object, object, object) && $defineProperty;
      } catch(error) {}
      return result;
    }());
    var stringFromCharCode = String.fromCharCode;
    var floor = Math.floor;
    var fromCodePoint = function() {
      var MAX_SIZE = 0x4000;
      var codeUnits = [];
      var highSurrogate;
      var lowSurrogate;
      var index = -1;
      var length = arguments.length;
      if (!length) {
        return '';
      }
      var result = '';
      while (++index < length) {
        var codePoint = Number(arguments[index]);
        if (
          !isFinite(codePoint) ||       // `NaN`, `+Infinity`, or `-Infinity`
          codePoint < 0 ||              // not a valid Unicode code point
          codePoint > 0x10FFFF ||       // not a valid Unicode code point
          floor(codePoint) != codePoint // not an integer
        ) {
          throw RangeError('Invalid code point: ' + codePoint);
        }
        if (codePoint <= 0xFFFF) { // BMP code point
          codeUnits.push(codePoint);
        } else { // Astral code point; split in surrogate halves
          // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
          codePoint -= 0x10000;
          highSurrogate = (codePoint >> 10) + 0xD800;
          lowSurrogate = (codePoint % 0x400) + 0xDC00;
          codeUnits.push(highSurrogate, lowSurrogate);
        }
        if (index + 1 == length || codeUnits.length > MAX_SIZE) {
          result += stringFromCharCode.apply(null, codeUnits);
          codeUnits.length = 0;
        }
      }
      return result;
    };
    if (defineProperty) {
      defineProperty(String, 'fromCodePoint', {
        'value': fromCodePoint,
        'configurable': true,
        'writable': true
      });
    } else {
      String.fromCodePoint = fromCodePoint;
    }
  }());
}

(function(funcName, baseObj) {
  funcName = funcName || "tafDocReady";
  baseObj = baseObj || window;
  var readyList = [];
  var readyFired = false;
  var readyEventHandlersInstalled = false;

  function ready() {
    if (!readyFired) {
      readyFired = true;
      for (var i = 0; i < readyList.length; i++) {
        readyList[i].fn.call(window, readyList[i].ctx);
      }
      readyList = [];
    }
  }

  function readyStateChange() {
    if ( document.readyState === "complete" ) {
      ready();
    }
  }

  baseObj[funcName] = function(callback, context) {
    if (typeof callback !== "function") {
      throw new TypeError("callback for docReady(fn) must be a function");
    }
    if (readyFired) {
      setTimeout(function() {callback(context);}, 1);
      return;
    } else {
      readyList.push({fn: callback, ctx: context});
    }
    if (document.readyState === "complete") {
      setTimeout(ready, 1);
    } else if (!readyEventHandlersInstalled) {
      if (document.addEventListener) {
        document.addEventListener("DOMContentLoaded", ready, false);
        window.addEventListener("load", ready, false);
      } else {
        document.attachEvent("onreadystatechange", readyStateChange);
        window.attachEvent("onload", ready);
      }
      readyEventHandlersInstalled = true;
    }
  }
})("tafDocReady", window);

(typeof taf == "undefined" || !taf.loaded) && (taf = {
  loaded: !0,
  queue: (typeof taf != "undefined") ? taf.queue : [],
/* Punycode */
  maxInt: 2147483647, // aka. 0x7FFFFFFF or 2^31-1
  base: 36,
  tMin: 1,
  tMax: 26,
  skew: 38,
  damp: 700,
  initialBias: 72,
  initialN: 128, // 0x80
  delimiter: '-', // '\x2D'
  regexPunycode: /^xn--/,
  regexNonASCII: /[^\0-\x7E]/, // non-ASCII chars
  regexSeparators: /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators
  errors: {
    'overflow': 'Overflow: input needs wider integers to process',
    'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
    'invalid-input': 'Invalid input'
  },
  baseMinusTMin: this.base - this.tMin,
  stringFromCharCode: String.fromCharCode,
  error: function(type) {
    throw new RangeError(this.errors[type]);
  },
  map: function(array, fn) {
    var result = [];
    var length = array.length;
    while (length--) {
      result[length] = fn(array[length]);
    }
    return result;
  },
  mapDomain: function(string, fn) {
    var parts = string.split('@');
    var result = '';
    if (parts.length > 1) {
      result = parts[0] + '@';
      string = parts[1];
    }
    string = string.replace(this.regexSeparators, '\x2E');
    var labels = string.split('.');
    var encoded = this.map(labels, fn).join('.');
    return result + encoded;
  },
  ucs2decode: function(string) {
    var output = [];
    var counter = 0;
    var length = string.length;
    while (counter < length) {
      var value = string.charCodeAt(counter++);
      if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
        var extra = string.charCodeAt(counter++);
        if ((extra & 0xFC00) == 0xDC00) { // Low surrogate.
          output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
        } else {
          output.push(value);
          counter--;
        }
      } else {
        output.push(value);
      }
    }
    return output;
  },
  ucs2encode: function(array) {
    return String.fromCodePoint.apply(null, array);
  },
  basicToDigit: function(codePoint) {
    if (codePoint - 0x30 < 0x0A) {
      return codePoint - 0x16;
    }
    if (codePoint - 0x41 < 0x1A) {
      return codePoint - 0x41;
    }
    if (codePoint - 0x61 < 0x1A) {
      return codePoint - 0x61;
    }
    return this.base;
  },
  digitToBasic: function(digit, flag) {
    return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
  },
  adapt: function(delta, numPoints, firstTime) {
    var k = 0;
    delta = firstTime ? Math.floor(delta / this.damp) : delta >> 1;
    delta += Math.floor(delta / numPoints);
    for (/* no initialization */; delta > this.baseMinusTMin * this.tMax >> 1; k += this.base) {
      delta = Math.floor(delta / this.baseMinusTMin);
    }
    return Math.floor(k + (this.baseMinusTMin + 1) * delta / (delta + this.skew));
  },
  decode: function(input) {
    var output = [];
    var inputLength = input.length;
    var i = 0;
    var n = this.initialN;
    var bias = this.initialBias;

    var basic = input.lastIndexOf(this.delimiter);
    if (basic < 0) {
      basic = 0;
    }

    for (var j = 0; j < basic; ++j) {
      if (input.charCodeAt(j) >= 0x80) {
        this.error('not-basic');
      }
      output.push(input.charCodeAt(j));
    }

    for (var index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

      var oldi = i;
      for (var w = 1, k = this.base; /* no condition */; k += this.base) {

        if (index >= inputLength) {
          this.error('invalid-input');
        }

        var digit = this.basicToDigit(input.charCodeAt(index++));

        if (digit >= this.base || digit > Math.floor((this.maxInt - i) / w)) {
          this.error('overflow');
        }

        i += digit * w;
        var t = k <= bias ? this.tMin : (k >= bias + this.tMax ? this.tMax : k - bias);

        if (digit < t) {
          break;
        }

        var baseMinusT = this.base - t;
        if (w > Math.floor(this.maxInt / baseMinusT)) {
          this.error('overflow');
        }

        w *= baseMinusT;

      }

      var out = output.length + 1;
      bias = this.adapt(i - oldi, out, oldi == 0);

      if (Math.floor(i / out) > this.maxInt - n) {
        this.error('overflow');
      }

      n += Math.floor(i / out);
      i %= out;

      output.splice(i++, 0, n);

    }

    return String.fromCodePoint.apply(null, output)
  },
  encode: function(input) {
    var output = [];

    input = this.ucs2decode(input);

    var inputLength = input.length;

    var n = this.initialN;
    var delta = 0;
    var bias = this.initialBias;

    for (var a = 0; a < inputLength; ++a) {
      var currentValue = input[a];
      if (currentValue < 0x80) {
        output.push(this.stringFromCharCode(currentValue));
      }
    }

    var basicLength = output.length;
    var handledCPCount = basicLength;

    if (basicLength) {
      output.push(this.delimiter);
    }

    while (handledCPCount < inputLength) {

      var m = this.maxInt;
      for (a = 0; a < inputLength; ++a) {
        var currentValue = input[a];
        if (currentValue >= n && currentValue < m) {
          m = currentValue;
        }
      }

      var handledCPCountPlusOne = handledCPCount + 1;
      if (m - n > Math.floor((this.maxInt - delta) / handledCPCountPlusOne)) {
        this.error('overflow');
      }

      delta += (m - n) * handledCPCountPlusOne;
      n = m;

      for (a = 0; a < inputLength; ++a) {
        var currentValue = input[a];
        if (currentValue < n && ++delta > this.maxInt) {
          this.error('overflow');
        }
        if (currentValue == n) {
          var q = delta;
          for (var k = this.base; /* no condition */; k += this.base) {
            var t = k <= bias ? this.tMin : (k >= bias + this.tMax ? this.tMax : k - bias);
            if (q < t) {
              break;
            }
            var qMinusT = q - t;
            var baseMinusT = this.base - t;
            output.push(
              this.stringFromCharCode(this.digitToBasic(t + qMinusT % baseMinusT, 0))
            );
            q = Math.floor(qMinusT / baseMinusT);
          }

          output.push(this.stringFromCharCode(this.digitToBasic(q, 0)));
          bias = this.adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
          delta = 0;
          ++handledCPCount;
        }
      }

      ++delta;
      ++n;

    }
    return output.join('');
  },
  toUnicode: function(input) {
    return this.mapDomain(input, function(string) {
      return this.regexPunycode.test(string)
        ? this.decode(string.slice(4).toLowerCase())
        : string;
    });
  },
  toASCII: function(input) {
    var _this = this;
    return this.mapDomain(input, function(string) {
      return _this.regexNonASCII.test(string)
        ? 'xn--' + _this.encode(string)
        : string;
    });
  },
/* Cookie */
  docCookies: {
    getItem: function (sKey) {
      if (!sKey) { return null; }
      var sValue = decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
      if(!sValue){
        try {
          sValue = decodeURIComponent(localStorage.getItem(encodeURIComponent(sKey)));
        } catch (e) {}
      }
      return sValue;
    },
    getItem2: function (sKey) {
      if (!sKey) { return [null, void 0]; }
      var method = 'c';
      var sValue = decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
      if(!sValue){
        try {
          sValue = decodeURIComponent(localStorage.getItem(encodeURIComponent(sKey)));
          method = 'ls';
        } catch (e) {}
      }
      return [sValue, method];
    },
    setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
      if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
      var sExpires = "";
      if (vEnd) {
        switch (vEnd.constructor) {
          case Number:
            sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
            break;
          case String:
            sExpires = "; expires=" + vEnd;
            break;
          case Date:
            sExpires = "; expires=" + vEnd.toUTCString();
            break;
        }
      }
      document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
      try {
        localStorage.setItem(encodeURIComponent(sKey), encodeURIComponent(sValue));
      } catch (e) {}
      return true;
    },
    removeItem: function (sKey, sPath, sDomain) {
      try {
        localStorage.removeItem(encodeURIComponent(sKey));
      } catch (e) {}
      if (!this.hasItem(sKey, true)) { return false; }
      document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "");
      return true;
    },
    hasItem: function (sKey, bCookieOnly) {
      if(bCookieOnly === undefined) {
        bCookieOnly = false;
      }
      if(!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) return false;
      if((new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie)) return true;
      if(bCookieOnly) return false;
      for(var nLen = localStorage.length, nIdx = 0; nIdx < nLen; nIdx++) {
        var aKey = decodeURIComponent(localStorage.key(nIdx));
        if(aKey == sKey){
          return true;
        }
      }
      return false;
    },
    hasLikeItem:function(sKey){
      if((new RegExp("(?:^|;\\s*\\w*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g,"\\$&") + "\\w*\\s*\\=")).test(document.cookie)) return true;
      for(var nLen = localStorage.length, nIdx = 0; nIdx < nLen; nIdx++) {
        var aKey = decodeURIComponent(localStorage.key(nIdx));
        if(0 <= aKey.indexOf(sKey)){
          return true;
        }
      }
      return false;
    },
    keys: function () {
      var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
      for (var nLen = aKeys.length, nIdx = 0; nIdx < nLen; nIdx++) {
        aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]);
      }
      for (nLen = localStorage.length, nIdx = 0; nIdx < nLen; nIdx++) {
        var aKey = decodeURIComponent(localStorage.key(nIdx));
        if(aKeys.indexOf(aKey) == -1){
          aKeys.push(aKey);
        }
      }
      return aKeys;
    },
    keysPickup: function (prefix) {
      var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
      var aKeysPickup = [];
      var nIdxPickup = 0;
      for (var nLen = aKeys.length, nIdx = 0; nIdx < nLen; nIdx++) {
        if(0 <= decodeURIComponent(aKeys[nIdx]).indexOf(prefix)) {
          aKeysPickup[nIdxPickup++] = decodeURIComponent(aKeys[nIdx]);
        }
      }
      for (nLen = localStorage.length, nIdx = 0; nIdx < nLen; nIdx++) {
        var aKey = decodeURIComponent(localStorage.key(nIdx));
        if(aKeysPickup.indexOf(aKey) == -1){
          if(0 <= aKey.indexOf(prefix)){
            aKeysPickup[nIdxPickup++] = aKey;
          }
        }
      }
      return aKeysPickup;
    }
  },
/* Log */
  hasLogMark: function(){
    var scripts = document.getElementsByTagName('script');
    for(var i = 0; i < scripts.length; i++){
      var attr = scripts[i].getAttribute('data-taflogmark');
      return attr ? true : false;
    }
  },
  logPrinter: function(info, type){
    if(this.hasLogMark() && window.console && 'function' == typeof window.console.log){
      console.log('[' + type + '] ' + info);
    }
  },
/* Track */
  cookies_keep_limit: 10,
  cookies_path: '/',
  cookie_expires: 3653,

  getUTCtime: function(offsetdays){
    var date = new Date();
    date.setDate(date.getDate() + offsetdays);
    return date.toUTCString();
  },
  getParamValue: function(paramname){
    var urlinfo = window.location.search.split('?');
    if(1 < urlinfo.length){
      var params = urlinfo[1].split('&');
      for(var i = 0; i < params.length; i++){
        var paraminfo = params[i].split('=');
        if(paraminfo[0] === paramname)
          return paraminfo[1];
      }
    }
    this.logPrinter('There is no Tosho AF parameter in request URI.', 'INFO');
    return '';
  },
  getPid: function(datastr){
    var match = datastr.match(/\.(.{2}\d{4}[0-9a-f]+(?:_[0-9a-zA-Z\+\/]*)?)$/);
    return match ? match[1] : '';
  },
  delCookie: function(key, domain){
    return !this.docCookies.removeItem(key, this.cookies_path) || !this.docCookies.removeItem(key, this.cookies_path, domain);
  },
  cookieSetting: function(prefix, datastr){
    if(!datastr || !prefix){
      this.logPrinter('There is no Tosho AF parameter in request URI.', 'DEBUG');
      return false;
    }
    if(!this.getPid(datastr)){
      this.logPrinter('There is no gid in Tosho AF parameter.', 'DEBUG');
      return false;
    }
    var keys = this.docCookies.keysPickup(prefix);
    if(keys.length >= this.cookies_keep_limit){
      var oldestkey = keys[0];
      this.logPrinter('Over the limit. The oldest cookie is: ' + oldestkey + '=' + this.docCookies.getItem(oldestkey), 'DEBUG');
    }
    var key = prefix + '_' + this.getPid(datastr);
    var domaininfo = this.toASCII(location.hostname).split('.');
    var domain = '';
    
    for(var domainlevel = domaininfo.length; 0 < domainlevel; domainlevel--){
      domain = '' === domain ? domaininfo[domainlevel - 1] : domaininfo[domainlevel - 1] + domain;
      if(1 < domainlevel){
        domain = '.' + domain;
      }
      if(oldestkey){
        if(this.delCookie(oldestkey, domain)){
          this.logPrinter('Delete the oldest Cookie (' + oldestkey + '; domain=' + domain + ').', 'DEBUG');
        }
      }
      this.docCookies.setItem(key, datastr, this.getUTCtime(this.cookie_expires), this.cookies_path, domain);
      if(this.docCookies.hasItem(key, true)){
        if(this.docCookies.getItem(key) === datastr){
          this.logPrinter('Set Cookie (' + key + '=' + datastr + '; domain=' + domain + ') successfully.', 'DEBUG');
          return true;
        }
      }
    }
    return ''; 
  },
  getCookie: function(prefix, key, key2){
    var cookiekey = prefix;
    var item;
    if(key){
      cookiekey += '_' + key;
    }
    if(key2){
      cookiekey2 = cookiekey + '_' + key2;
      if(this.docCookies.hasItem(cookiekey2)){
        item = this.docCookies.getItem2(cookiekey2);
        return [cookiekey2, item[0], item[1]];
      }
    }
    if(this.docCookies.hasItem(cookiekey)){
      item = this.docCookies.getItem2(cookiekey);
      return [cookiekey, item[0], item[1]];
    }
    if(this.docCookies.hasLikeItem(cookiekey)){
      var cookiespickup = this.docCookies.keysPickup(cookiekey);
      if(_instanceof(cookiespickup, Array) && cookiespickup.length > 0){
        item = this.docCookies.getItem2(cookiespickup[0]);
        return [cookiespickup[0], item[0], item[1]];
      }
    }
    if(this.docCookies.hasItem(prefix)){
      item = this.docCookies.getItem2(prefix);
      return [prefix, item[0], item[1]];
    }
    return [void 0, void 0, void 0];
  },
  checkCurrency: function(currency){
    if('string' == typeof currency && !0 === /^[A-Za-z]/.test(currency) && 3 == currency.length){
      return currency;
    }else{
      this.logPrinter('currency = ' + currency + ': \u901a\u8ca8\u5358\u4f4d\u6307\u5b9a\u304c\u5b58\u5728\u3057\u306a\u3044\u304b\u3001\u6b63\u3057\u304f\u8a8d\u8b58\u3055\u308c\u306a\u304b\u3063\u305f\u305f\u3081\u300cJPY\u300d\u3092\u9069\u7528\u3057\u307e\u3059\u3002', 'DEBUG');
      return 'JPY';
    }
  },
  genarateSIparam: function(item){
    if('number' != typeof item.price){
      return '';
    }
    var price = item.price;
    var quantity = 'number' == typeof item.quantity && 0 <= item.quantity && !1 === /^-?[0-9]+\.[0-9]+$/.test(item.quantity) ? Math.floor(item.quantity) : 1;
    var total_price = 'number' == typeof item.total_price && '' !== item.total_price ? item.total_price : price * quantity;
    var code = 'string' == typeof item.code && '' !== item.code ? item.code : 'taf';
    return '&si=' + price + '-' + quantity + '-' + total_price + '-' + code;
  },
  _sales: function(params){
    this.logPrinter('sales() start', 'INFO');

    var baseurl = '//af.tosho-trading.co.jp/cvjs3?pid=';
    if('string' == typeof params.pid){
      baseurl += params.pid;
    }else{
      if(params.pid && 'string' != typeof params.pid){
        this.logPrinter(params.pid + ': pid\u304c\u6587\u5b57\u5217\u3067\u306f\u3042\u308a\u307e\u305b\u3093\u3002', 'ERROR');
      }else{
        this.logPrinter('pid\u304c\u8a2d\u5b9a\u3055\u308c\u3066\u304a\u308a\u307e\u305b\u3093\u3002', 'ERROR');
      }
    }

    if(params.cid){
      baseurl += '_' + params.cid;
    }

    var si = '';
    if(void 0 === params.items){
      if('number' != typeof params.price || 'number' != typeof params.quantity){
        if('number' != typeof params.price){
          params.price = 0;
          this.logPrinter('price = ' + params.price + ': \u5546\u54c1\u5358\u4fa1\u306e\u5165\u529b\u5024\u304c\u7570\u306a\u308a\u307e\u3059\u3002\u534a\u89d2\u6570\u5b57\u3067\u5165\u529b\u3057\u3066\u304f\u3060\u3055\u3044\u3002', 'ERROR');
        }
        if('number' != typeof params.quantity){
          params.quantity = 1;
          this.logPrinter('quantity = ' + params.quantity + ': \u5546\u54c1\u500b\u6570\u306e\u5165\u529b\u5024\u304c\u7570\u306a\u308a\u307e\u3059\u3002\u534a\u89d2\u6570\u5b57\u3067\u5165\u529b\u3057\u3066\u304f\u3060\u3055\u3044\u3002', 'ERROR');
        }
      }

      si = this.genarateSIparam({
        code: params.code,
        price: params.price,
        quantity: params.quantity,
        total_price: params.total_price
      });
    }else{
      for(var i = 0; i < params.items.length; i++){
        if('number' != typeof params.items[i].price || 'number' != typeof params.items[i].quantity){
          if('number' != typeof params.items[i].price){
            params.items[i].price = 0;
            this.logPrinter('price = ' + params.items[i].price + ': \u5546\u54c1\u5358\u4fa1\u306e\u5165\u529b\u5024\u304c\u7570\u306a\u308a\u307e\u3059\u3002\u534a\u89d2\u6570\u5b57\u3067\u5165\u529b\u3057\u3066\u304f\u3060\u3055\u3044\u3002', 'ERROR');
          }
          if('number' != typeof params.items[i].quantity){
            params.items[i].quantity = 1;
            this.logPrinter('quantity = ' + params.items[i].quantity + ': \u5546\u54c1\u500b\u6570\u306e\u5165\u529b\u5024\u304c\u7570\u306a\u308a\u307e\u3059\u3002\u534a\u89d2\u6570\u5b57\u3067\u5165\u529b\u3057\u3066\u304f\u3060\u3055\u3044\u3002', 'ERROR');
          }
        }
        si += this.genarateSIparam(params.items[i]);
      }
    }
    var currency = this.checkCurrency(params.currency);
    var cookieinfo = this.getCookie('_taf', params.pid, params.cid);
    if(_instanceof(cookieinfo, Array) && cookieinfo.length == 3){
      key = cookieinfo[0];
      data = cookieinfo[1];
      method = cookieinfo[2];
    }else{
      key = void 0;
      data = void 0;
      method = void 0;
    }

    if(!si){
      this.logPrinter('si = ' + si + ': si\u5024\u306b\u6b63\u3057\u3044\u5024\u304c\u5165\u529b\u3067\u304d\u3066\u304a\u308a\u307e\u305b\u3093\u3002sales\u306eitems\u306e\u78ba\u8a8d\u3092\u3057\u3066\u304f\u3060\u3055\u3044\u3002', 'ERROR');
      this.logPrinter('\u6b63\u5e38\u306a\u5024\u304c\u53d6\u5f97\u3067\u304d\u306a\u3044\u305f\u3081\u3001\u51e6\u7406\u3092\u7d42\u4e86\u3057\u307e\u3059\u3002', 'INFO');
      return (void 0);
    }
    if(!baseurl){
      this.logPrinter('\u6210\u679c\u30bf\u30b0\u306eURL\u306e\u751f\u6210\u306b\u5931\u6557\u3057\u307e\u3057\u305f\u3002', 'ERROR');
      this.logPrinter('\u6b63\u5e38\u306a\u5024\u304c\u53d6\u5f97\u3067\u304d\u306a\u3044\u305f\u3081\u3001\u51e6\u7406\u3092\u7d42\u4e86\u3057\u307e\u3059\u3002\u8a2d\u5b9a\u5024\u3092\u78ba\u8a8d\u3057\u3066\u304f\u3060\u3055\u3044\u3002', 'INFO');
      return (void 0);
    }

    var order_number;
    if('string' == typeof params.order_number && '' !== params.order_number.trim()){
      order_number = params.order_number;
    }else if('number' == typeof params.order_number && 0 !== params.order_number){
      order_number = '' + params.order_number;
    }else{
      var datenow = new Date();
      order_number = 'null-' + datenow.getFullYear() + (datenow.getMonth() + 1).padStart(2, '0') + datenow.getDate().padStart(2, '0') + datenow.getHours().padStart(2, '0') + datenow.getMinutes().padStart(2, '0') + datenow.getSeconds().padStart(2, '0') + '-' + datenow.getMilliseconds().padStart(3, '0') + ('' + Math.floor(1e4 * Math.random())).slice(-4).padStart(4, '0');
      params.order_number_custom = order_number;
      this.logPrinter('\u6ce8\u6587\u756a\u53f7\u304c\u8a2d\u5b9a\u3055\u308c\u3066\u3044\u307e\u305b\u3093\u3002null-\u30bf\u30a4\u30e0\u30b9\u30bf\u30f3\u30d7-\u4e71\u6570\u3092\u81ea\u52d5\u751f\u6210\u3057\u307e\u3059\u3002', 'DEBUG');
      this.logPrinter('order_number = ' + order_number, 'DEBUG');
    }
    var imgurl;
    if(void 0 === data)
      imgurl = baseurl + '&so=' + order_number + si + '&currency=' + currency + '&type=image';
    else
      imgurl = baseurl + '&so=' + order_number + si + '&currency=' + currency + '&type=image&taf=' + data;
    if(void 0 !== method)
      imgurl += '&method=' + method;
    params.si = si;

    var tag = document.getElementById('tafsales');
    if(!tag){
      tag = document.createElement('span');
      tag.id = 'tafsales';
      document.body.appendChild(tag);
    }
    var imgtag = document.createElement('img');
    imgtag.setAttribute('src', imgurl);
    imgtag.setAttribute('width', '0');
    imgtag.setAttribute('height', '0');
    imgtag.setAttribute('border', '0');
    tag.appendChild(imgtag);

    if('undefined' !== imgurl){
      this.logPrinter('sales() is SUCCESS. URL=' + imgurl, 'DEBUG');
    }

    this.logPrinter('sales() end', 'INFO');
  },
  sales: function(params){
    if(document.body){
      this._sales(params);
    }else{
      var _this = this;
      tafDocReady(function(){_this._sales(params);});
    }
  },

  version: '1.4.1'
});

if(taf.getParamValue('taf')){
  taf.logPrinter('Set cookie :' + taf.cookieSetting('_taf', taf.getParamValue('taf')), 'INFO');
}

if(taf.queue && taf.queue.length){
  while((tafobj = taf.queue.shift()) !== undefined){
    taf.sales(tafobj);
  }
}
