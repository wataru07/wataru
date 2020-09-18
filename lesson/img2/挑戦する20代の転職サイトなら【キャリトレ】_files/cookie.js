var paramPrescoid      = '';
var paramPrescoIdArray = [];
var paramPrescoResult  = false;
var cookie             = prescoGetCookie();
var localStorageObj    = getLocalStorage();
var prescoDomain       = PrescoGetDomain(); // スクリプト呼び出しドメイン

if ( (typeof(cid) === 'undefined' ) ) var cid = '';
if ( (typeof(gid) === 'undefined' ) ) var gid = '';

/**
 * パラメータを解析してクッキーに保存する
 */

try {
    if (location.search.match(/presco_sid=(.*?)(&|$)/)) {
        paramPrescoid = decodeURIComponent(location.search.match(/presco_sid=(.*?)(&|$)/)[1]);// 現在アクセスしているページのＵＲＬパラメータを正規表現で取得する。
    }

    // ドット区切りでパラメータを分割する
    paramPrescoIdArray = paramPrescoid.split('.');

    // 離脱→再流入(URLパラメータを伴っていない)
    if (paramPrescoIdArray == '') {
       if (cookie.hasItem('CPR' + cid)) {
          // P_CPR = Parameter_ContentId_Presco の略
          paramPrescoid = cookie.getItem('P_CPR' + cid) + '.' + cookie.getItem('CPR' + cid);
          // ドット区切りでパラメータを分割する
          paramPrescoIdArray = paramPrescoid.split('.');
          // バリデーションの実施
          if (cidValidate(cid, paramPrescoIdArray) === false) {
            prescoExit('');
          }
       } else if (cookie.hasItem('GPR' + gid)) {
          // P_GPR = Parameter_GroupId_Presco の略
          paramPrescoid = cookie.getItem('P_GPR' + gid) + '.' + cookie.getItem('GPR' + gid);
          // ドット区切りでパラメータを分割する
          paramPrescoIdArray = paramPrescoid.split('.');
          // バリデーションの実施
          if (gidValidate(gid, paramPrescoIdArray) === false) {
            prescoExit('');
          }
       } else if (localStorageObj.hasItem('CPR' + cid)) { // localstorage 広告単体
           // P_CPR = Parameter_ContentId_Presco の略
           paramPrescoid = localStorageObj.getItem('P_CPR' + cid) + '.' + localStorageObj.getItem('CPR' + cid);
           // ドット区切りでパラメータを分割する
           paramPrescoIdArray = paramPrescoid.split('.');
           // バリデーションの実施
           if (cidValidate(cid, paramPrescoIdArray) === false) {
             prescoExit('');
           }
       } else if (localStorageObj.hasItem('GPR' + gid)) { // localstorage 広告グループ
           // P_GPR = Parameter_GroupId_Presco の略
           paramPrescoid = localStorageObj.getItem('P_GPR' + gid) + '.' + localStorageObj.getItem('GPR' + gid);
           // ドット区切りでパラメータを分割する
           paramPrescoIdArray = paramPrescoid.split('.');
           // バリデーションの実施
           if (gidValidate(gid, paramPrescoIdArray) === false) {
             prescoExit('');
           }
       } else {
          prescoExit('');
       }
    }

    // バリデーションの実施
     if (paramValidate(paramPrescoIdArray) === false) {
        prescoExit('');
     }

    // 有効期限の作成
    var nowtime    = new Date().getTime();
    var clearTime  = new Date(nowtime + (60 * 60 * 24 * 1000 * paramPrescoIdArray[2]));
    var expires    = clearTime.toGMTString(); // toGMTString インターネットグリニッジ標準時 (GMT) 協定に基づき、与えられた日付を表す文字列。

    // CIDのクッキーを残す
    var origin = prescoGetOriginDomain();

    // CPR = ContentId_Presco の略
    document.cookie = 'CPR' + paramPrescoIdArray[0] + '=' + paramPrescoIdArray[3] + '; expires=' + expires + '; path=/; domain=.' + origin;
    // P_CPR = Parameter_ContentId_Presco の略
    document.cookie = 'P_CPR' + paramPrescoIdArray[0] + '=' + paramPrescoIdArray[0] + '.' + paramPrescoIdArray[1] + '.' + paramPrescoIdArray[2] + '; expires=' + expires + '; path=/; domain=.' + origin;
    // Local Storage 広告単体 セッション
    localStorageObj.setItem(
            'CPR' + paramPrescoIdArray[0],
            paramPrescoIdArray[3],
            expires
            );
    // Local Storage 広告単体 再流入用
    localStorageObj.setItem(
            'P_CPR' + paramPrescoIdArray[0],
            paramPrescoIdArray[0] + '.' + paramPrescoIdArray[1] + '.' + paramPrescoIdArray[2],
            expires
            );
    // GIDがある場合クッキーを残す
    if (paramPrescoIdArray[1] != 0) {
        // GPR = GroupId_Presco の略
        document.cookie = 'GPR' + paramPrescoIdArray[1] + '=' + paramPrescoIdArray[3] + '; expires=' + expires + '; path=/; domain=.' + origin;
        // P_GPR = Parameter_GroupId_Presco の略
        document.cookie = 'P_GPR' + paramPrescoIdArray[1] + '=' + paramPrescoIdArray[0] + '.' + paramPrescoIdArray[1] + '.' + paramPrescoIdArray[2] + '; expires=' + expires + '; path=/; domain=.' + origin;
        // Local Storage 広告単体 セッション
        localStorageObj.setItem(
                'GPR' + paramPrescoIdArray[1],
                paramPrescoIdArray[3],
                expires
                );
        // Local Storage 広告単体 再流入用
        localStorageObj.setItem(
                'P_GPR' + paramPrescoIdArray[1],
                paramPrescoIdArray[0] + '.' + paramPrescoIdArray[1] + '.' + paramPrescoIdArray[2],
                expires
                );
    }

    paramPrescoResult = true;

} catch (errorMsg) {
	// console.log('ITP_Error!: ');
	// console.log(errorMsg);
}

try {
	// 付与するパラメータがない場合は処理しない
	if (paramPrescoResult == false) {
		prescoExit('');
	}
	// パラメータを付与するスクリプトを読み込ませる
	// defer付きで読み込むのでコールバックで呼ばれる処理は最後になる
	prescoLoadScript(prescoDomain + '/fpc/param.js', paramPrescoIdArray, function(paramPrescoIdArray) {
		prescoAddParameter(paramPrescoIdArray);
	});
} catch (errorMsg) {
}

/**
 * スクリプトファイルを動的に読み込み生成する
 *
 * @param src 読み込むソースファイルのURL
 * @param paramPrescoIdArray パラメータ配列
 * @param callback コールバック関数
 * @returns
 */
function prescoLoadScript(src, paramPrescoIdArray, callback) {
	var done     = false;
	var head     = document.getElementsByTagName('head')[0];
	var script   = document.createElement('script');
	script.src   = src;
	script.defer = true;
	script.async = false;
	head.appendChild(script);
	// Attach handlers for all browsers
	script.onload = script.onreadystatechange = function() {
		if ( !done && (!this.readyState ||
				this.readyState === 'loaded' || this.readyState === 'complete') ) {
			done = true;
			callback(paramPrescoIdArray);
			//Handle memory leak in IE
			script.onload = script.onreadystatechange = null;
			if ( head && script.parentNode ) {
			//	head.removeChild( script );
			}
	    }
	};
}

/**
 * presco_sidのバリデーション
 * @param paramPrescoId Array パラメータ配列
 * @return boolean true エラーなし / false エラーあり
 */
function paramValidate(paramPrescoIdArray) {

    if (paramPrescoIdArray.length != 4) {
        return false;
    }

    // 広告IDの検証
    if ( (typeof(paramPrescoIdArray[0]) === 'undefined' || paramPrescoIdArray[0] === null) || isNaN(paramPrescoIdArray[0] ) !== false ) {
        return false;
    } else {
    	if(paramPrescoIdArray[0] < 0){
            return false; // マイナス値はエラー
     	}
    }

    // 広告グループIDの検証
    if ( (typeof(paramPrescoIdArray[1]) === 'undefined' || paramPrescoIdArray[1] === null) || isNaN(paramPrescoIdArray[1]) !== false ) {
        return false;
    } else {
    	if(paramPrescoIdArray[1] < 0){
            return false; // マイナス値はエラー
     	}
    }

    // クッキー保存期間の検証
    if ( (typeof(paramPrescoIdArray[2]) === 'undefined' || paramPrescoIdArray[2] === null) || isNaN(paramPrescoIdArray[2]) !== false || paramPrescoIdArray[2] == 0) {
        return false;
    } else {
    	if(paramPrescoIdArray[2] < 0){
            return false; // マイナス値はエラー
     	}
    }

    // アフィリエイトIDの検証
    if ( (typeof(paramPrescoIdArray[3]) === 'undefined' || paramPrescoIdArray[3] === null) || paramPrescoIdArray[3] === "") {
        return false;
    } else if (paramPrescoIdArray[3].match(/[^A-Za-z0-9]+/)) { // 半角英数字以外の文字が存在する場合、エラー
        return false;
    } else if( paramPrescoIdArray[3].length != 16){ // 16桁でなければエラー
        return false;
    }

    return true;
}

/**
 * cidのバリデーション
 * @param cid 広告ID
 * @param paramPrescoId Array パラメータ配列
 * @return boolean true エラーなし / false エラーあり
 */
function cidValidate(cid, paramPrescoIdArray) {

    // 広告IDの検証
    if ( (typeof(cid) === 'undefined' || cid === null) || isNaN(cid) !== false ) {
       return false;
    } else {
    	if(cid < 0){
            return false; // マイナス値はエラー
     	}
    }

    // ＵＲＬパラメータの値とタグに指定してある値が異なる
    if(paramPrescoIdArray[0] != cid){
        return false;
    }

    return true;
}

/**
 * gidのバリデーション
 * @param gid 広告グループID
 * @param paramPrescoId Array パラメータ配列
 * @return boolean true エラーなし / false エラーあり
 */
function gidValidate(gid, paramPrescoIdArray) {

    // 広告グループIDの検証
    if ( (typeof(gid) === 'undefined' || gid === null) || isNaN(gid) !== false ) {
       return false;
    } else {
    	if(gid < 0){
            return false; // マイナス値はエラー
     	}
    }

    // ＵＲＬパラメータの値とタグに指定してある値が異なる
    if(paramPrescoIdArray[1] != gid){
        return false;
    }

    return true;
}

/**
 * クッキー情報を取得しオブジェクトとして返却する
 * https://developer.mozilla.org/ja/docs/Web/API/Document/cookie
 * @return オブジェクト クッキー情報
 */
function prescoGetCookie()
{
	var docCookies = {
		getItem: function (sKey) {
			if (!sKey || !this.hasItem(sKey)) { return null; }
			return unescape(document.cookie.replace(new RegExp("(?:^|.*;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"), "$1"));
		},
		setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
			if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return; }
			var sExpires = "";
			if (vEnd) {
				switch (vEnd.constructor) {
					case Number:
						sExpires = vEnd === Infinity ? "; expires=Tue, 19 Jan 2038 03:14:07 GMT" : "; max-age=" + vEnd;
						break;
					case String:
						sExpires = "; expires=" + vEnd;
						break;
					case Date:
						sExpires = "; expires=" + vEnd.toGMTString();
						break;
				}
			}
			document.cookie = escape(sKey) + "=" + escape(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
		},
		removeItem: function (sKey, sPath) {
			if (!sKey || !this.hasItem(sKey)) { return; }
			document.cookie = escape(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sPath ? "; path=" + sPath : "");
		},
		hasItem: function (sKey) {
			return (new RegExp("(?:^|;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
		},
		keys: /* optional method: you can safely remove it! */ function () {
			var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
			for (var nIdx = 0; nIdx < aKeys.length; nIdx++) { aKeys[nIdx] = unescape(aKeys[nIdx]); }
			return aKeys;
		}
	};
	return docCookies;
}

/**
 * 現在のスクリプトの呼び出しドメインを取得する
 * @return string ドメイン(ex http://ad.presco.jp)
 */
function PrescoGetDomain()
{
    var currentScriptElement = document.getElementById('presco_script');

    if (currentScriptElement) {
       currentScript = currentScriptElement.src;
    } else {
        currentScript = location.protocol + '//ad.presco.asia/fpc/cookie.js';
    }

    var urlArray = currentScript.match(/^(.*?:\/\/)(.*?)([a-z0-9][a-z0-9\-]{1,63}\.[a-z\.]{2,6})[\:[0-9]*]?([\/].*?)?$/i);
    return urlArray[1] + urlArray[2] + urlArray[3];
}

/**
 * サブドメインなしのドメイン名を取得する
 * @return string サブドメインなしのドメイン名
 */
function prescoGetOriginDomain()
{
	var origin      = '';
	var sessionName = 's';
	var cookie      = prescoGetCookie();

	// ドメインをピリオドで分割
	var domains = location.hostname.split('.').reverse();
	var length  = domains.length;

	// トップレベルから順に回してクッキーをセットしていく
	for (var i= 0; i < length; i++) {
		// 仮ドメインを生成
		var bufOrigin = domains.slice(0, i + 1).reverse().join('.');

		// 仮ドメインを用いてクッキーをセット
		document.cookie = sessionName + '=s; domain=.' + bufOrigin + '; path=/';

		// セットしたクッキーの値が取得できたら利用可能かつ一番高いレベルのドメインであるとみなし、オリジンとする
		if (cookie.hasItem(sessionName)) {
			origin = bufOrigin;
		}

		// 先にセットしたクッキーを削除しておく
		document.cookie = sessionName + '=; domain=.' + bufOrigin + '; path=/; Max-age=0';

		// オリジンがセットできたら終了
		if (origin) {
			break;
		}
	}

	return origin;
}

/**
 * 
 */
function getLocalStorage()
{
    var docLocalStorages = {
        getItem: function (sKey) {
            if (!sKey ||  !localStorage.getItem(sKey)) { return null; }
            var sessionId = localStorage.getItem(sKey);
            return unescape(sessionId.replace(new RegExp("(?:^|.*;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"), "$1"));
        },
        setItem: function (sKey, sValue, expires) {
            if (!sKey || !expires) { return; }
            localStorage.setItem(sKey, sValue);
            // Web Storage の localStorage は期限が設定できないので項目として登録する
            localStorage.setItem(sKey + '_expires', expires);
        },
        removeItem: function (sKey) {
            if (!sKey) { return; }
            localStorage.removeItem(sKey);
        },
        hasItem: function (sKey) {
            if (!sKey) { return; }
            return Boolean(localStorage.getItem(sKey));
        },
        removeCheck: function(sKey){
            if (!sKey) { return; }
            var target_expires = localStorage.getItem(sKey + '_expires');
            var nowDate        = new Date(Date.now());
            if(target_expires && target_expires < nowDate){
                this.removeItem(sKey);
                this.removeItem(sKey + '_expires');
            }
        }
    };
    return docLocalStorages;
};

/**
 * 例外処理の実行させる為のexit関数
 * @param errorMsg エラーメッセージ
 */
function prescoExit(errorMsg) {
	throw (errorMsg);
}
