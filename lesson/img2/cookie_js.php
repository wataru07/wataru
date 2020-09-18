var uqid = (typeof(uqid) !== 'undefined') ? uqid : "S10dX6bed35e454X";
var _createClass=function(){function a(a,b){for(var c,d=0;d<b.length;d++)c=b[d],c.enumerable=c.enumerable||!1,c.configurable=!0,'value'in c&&(c.writable=!0),Object.defineProperty(a,c.key,c)}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}();function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError('Cannot call a class as a function')}var fpcCookie=function(){function a(b){_classCallCheck(this,a),this.currentScript=b?document.getElementById(b):null,this.paramName='fpc',this.regExp=this.paramName+'=([^?&]*)',this.cookie=this.getCookie(),this.local_Storage=this.getLocalStorage(),this.domain=this.getDomain(),this.origin=this.getOriginDomain(),this.fpcAction=null,this.fpcActionOption={},this.prefixSessionId={content:'CTC',group:'CTG'},this.prefixReflow={content:'RCTC',group:'RCTG'},this.paramArray=null,this.paramSpliter='.',this.uniqueId='undefined'==typeof uqid?0:uqid,this.contentId='undefined'==typeof cid?0:cid,this.groupId='undefined'==typeof gid?0:gid,this.contentIdFormat='_'+this.uniqueId+'-'+this.contentId,this.groupIdFormat='_'+this.uniqueId+'-'+this.groupId,this.isSetItpParam='',this.overwriteFromDatasetId()}return _createClass(a,[{key:'setFpcAction',value:function setFpcAction(a,b){a&&'function'==typeof a.action&&(this.fpcAction=a,this.fpcActionOption=b)}},{key:'saveFpcCookie',value:function saveFpcCookie(){var a=new XMLHttpRequest,b=this,c=0;a.onload=function(){if(404!==this.status){var c=JSON.parse(a.responseText);if('undefined'!=typeof c.isSetItpParam&&(b.isSetItpParam=c.isSetItpParam,b.isSetItpParam==1||b.isSetItpParam==2)){var d=new Date(Date.now()+86400000*b.paramArray[2]),e=d.toGMTString(),f='_'+b.uniqueId+'-'+b.paramArray[0];if(b.cookie.setItem(b.prefixSessionId.content+f,b.paramArray[3],d,'/',b.origin),b.local_Storage.setItem(b.prefixSessionId.content+f,b.paramArray[3],d),b.setSessionForcloud('content',b.paramArray[0],d),b.cookie.setItem(b.prefixReflow.content+f,b.paramArray.join(b.paramSpliter),d,'/',b.origin),b.local_Storage.setItem(b.prefixReflow.content+f,b.paramArray.join(b.paramSpliter),d),0!=b.paramArray[1]){var g='_'+b.uniqueId+'-'+b.paramArray[1];b.cookie.setItem(b.prefixSessionId.group+g,b.paramArray[3],d,'/',b.origin),b.local_Storage.setItem(b.prefixSessionId.group+g,b.paramArray[3],d),b.cookie.setItem(b.prefixReflow.group+g,b.paramArray.join(b.paramSpliter),d,'/',b.origin),b.local_Storage.setItem(b.prefixReflow.group+g,b.paramArray.join(b.paramSpliter),d),b.setSessionForcloud('group',b.paramArray[1],d)}b.loadScript('//'+b.domain+'/fpc/param.min.js',b.paramArray,function(a){var c=new fpcParam(a);c.addParameter(b.isSetItpParam,b.uniqueId)})}}},a.onerror=function(){};try{var d=this.getFpcParameter();if(!d){this.paramName='cats_sid',this.regExp=this.paramName+'=([^?&]*)';var d=this.getFpcParameter()}if(!this.paramArray){var e='',f=this.checkReflowCookieForcloud();this.cookie.hasItem(this.prefixReflow.content+this.contentIdFormat)?e=this.cookie.getItem(this.prefixReflow.content+this.contentIdFormat):this.cookie.hasItem(this.prefixReflow.group+this.groupIdFormat)?e=this.cookie.getItem(this.prefixReflow.group+this.groupIdFormat):this.local_Storage.hasItem(this.prefixReflow.content+this.contentIdFormat)?e=this.local_Storage.getItem(this.prefixReflow.content+this.contentIdFormat):this.local_Storage.hasItem(this.prefixReflow.group+this.groupIdFormat)?e=this.local_Storage.getItem(this.prefixReflow.group+this.groupIdFormat):!1==f?this.exit('not parameter'):(e=f,this.useFcCookie=!0),this.paramArray=e.split(this.paramSpliter)}(0==b.uniqueId||'undefined'==typeof b.paramArray[0])&&this.exit('not paramater'),0!=b.contentId&&b.paramArray[0]!=b.contentId&&this.exit('non target cid'),0!=b.groupId&&b.paramArray[1]!=b.groupId&&this.exit('non target gid'),c=b.paramArray[0],a.open('POST','//'+b.domain+'/fpc/getIsSetItpParam.php',!0),b.fpcAction&&a.addEventListener('load',function(){switch(b.fpcActionOption.method){case'action':b.fpcAction.action(b.fpcActionOption.cid,b.fpcActionOption.af,b.fpcActionOption.uid,b.fpcActionOption.pid,b.fpcActionOption.amount,b.fpcActionOption.uqid);break;case'groupAction':b.fpcAction.groupAction(b.fpcActionOption.gid,b.fpcActionOption.af,b.fpcActionOption.uid,b.fpcActionOption.pid,b.fpcActionOption.amount,b.fpcActionOption.uqid);break;default:throw new Error('no match action method');}}),a.withCredentials=!0,a.setRequestHeader('Content-Type','application/x-www-form-urlencoded'),a.send('cid='+c+'&uniqueId='+b.uniqueId)}catch(a){}}},{key:'loadScript',value:function loadScript(a,b,c){var d=!1,e=document.getElementsByTagName('head')[0],f=document.createElement('script');f.src=a,f.defer=!0,f.async=!1,e.appendChild(f),f.onload=f.onreadystatechange=function(){d||this.readyState&&'loaded'!==this.readyState&&'complete'!==this.readyState||(d=!0,c(b),f.onload=f.onreadystatechange=null,e&&f.parentNode)}}},{key:'overwriteFromDatasetId',value:function overwriteFromDatasetId(){this.currentScript&&(this.currentScript.dataset.uqid&&(this.uniqueId=this.currentScript.dataset.uqid),this.currentScript.dataset.cid&&(this.contentId=this.currentScript.dataset.cid),this.currentScript.dataset.gid&&(this.groupId=this.currentScript.dataset.gid))}},{key:'getDomain',value:function getDomain(){if(this.currentScript){var a=new RegExp(/^((.*?:\/\/)([^\/:]*)(:([0-9]+))?([^\?]*)(\?([^#]*))?(.*)?)$/),b=this.currentScript.src.match(a);return b[3]}return'ac.dmtag.jp'}},{key:'getOriginDomain',value:function getOriginDomain(){for(var a,b='',c='s',d=location.hostname.split('.').reverse(),e=d.length,f=0;f<e;f++){a=d.slice(0,f+1).reverse().join('.'),this.cookie.setItem(c,'s',null,'/',a),this.cookie.hasItem(c)&&(b=a);var g=new Date(Date.now()-3600),h=g.toGMTString();if(this.cookie.setItem(c,null,h,'/',a),b)break}return b}},{key:'getCookie',value:function getCookie(){return{getItem:function getItem(a){return a&&this.hasItem(a)?unescape(document.cookie.replace(new RegExp('(?:^|.*;\\s*)'+escape(a).replace(/[\-\.\+\*]/g,'\\$&')+'\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*'),'$1')):null},setItem:function setItem(a,b,c,d,e,f){if(a&&!/^(?:expires|max\-age|path|domain|secure)$/i.test(a)){var g='';if(c)switch(c.constructor){case Number:g=c===Infinity?'; expires=Tue, 19 Jan 2038 03:14:07 GMT':'; max-age='+c;break;case String:g='; expires='+c;break;case Date:g='; expires='+c.toGMTString();}document.cookie=escape(a)+'='+escape(b)+g+(e?'; domain='+e:'')+(d?'; path='+d:'')+(f?'; secure':'')}},removeItem:function removeItem(a,b){a&&this.hasItem(a)&&(document.cookie=escape(a)+'=; expires=Thu, 01 Jan 1970 00:00:00 GMT'+(b?'; path='+b:''))},hasItem:function hasItem(a){return new RegExp('(?:^|;\\s*)'+escape(a).replace(/[\-\.\+\*]/g,'\\$&')+'\\s*\\=').test(document.cookie)},keys:function keys(){for(var a=document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g,'').split(/\s*(?:\=[^;]*)?;\s*/),b=0;b<a.length;b++)a[b]=unescape(a[b]);return a}}}},{key:'getLocalStorage',value:function getLocalStorage(){return{getItem:function getItem(a){if(!a||!localStorage.getItem(a))return null;var b=localStorage.getItem(a);return unescape(b.replace(new RegExp('(?:^|.*;\\s*)'+escape(a).replace(/[\-\.\+\*]/g,'\\$&')+'\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*'),'$1'))},setItem:function setItem(a,b,c){a&&c&&(localStorage.setItem(a,b),localStorage.setItem(a+'_expires',c))},removeItem:function removeItem(a){a&&localStorage.removeItem(a)},hasItem:function hasItem(a){return a?!!localStorage.getItem(a):void 0},removeCheck:function removeCheck(a){if(a){var b=localStorage.getItem(a+'_expires'),c=new Date(Date.now());b&&b<c&&(this.removeItem(a),this.removeItem(a+'_expires'))}}}}},{key:'exit',value:function exit(a){throw new Error(a)}},{key:'getFpcParameter',value:function getFpcParameter(){var a=new RegExp(this.regExp),b=location.search.match(a);return b&&(b=decodeURIComponent(b[1]),this.paramArray=b.split(this.paramSpliter),0!=this.contentId&&this.paramArray[0]!=this.contentId&&this.exit('non target cid'),0!=this.groupId&&this.paramArray[1]!=this.groupId&&this.exit('non target gid')),b}},{key:'checkReflowCookieForcloud',value:function checkReflowCookieForcloud(){var a={content:'P_CCATS',group:'P_GCATS'},b={content:this.contentId,group:this.groupId},c='',d='',e=!1;if(this.cookie.hasItem(a.content+b.content)?d='content':this.cookie.hasItem(a.group+b.group)&&(d='group'),d){e=this.cookie.getItem(a[d]+b[d]),c=this.cookie.getItem({content:'CCATS',group:'GCATS'}[d]+b[d]);var f=e.split('.'),g=new Date(Date.now()+86400000*f[2]);f[3]=c;var h=f.join('.');this.cookie.setItem(a[d]+b[d],h,g,'/',this.origin),e=h}return e}},{key:'setSessionForcloud',value:function setSessionForcloud(a,b,c){var d={content:b,group:b};this.cookie.setItem({content:'CCATS',group:'GCATS'}[a]+d[a],this.paramArray[3],c,'/',this.origin),this.cookie.setItem({content:'P_CCATS',group:'P_GCATS'}[a]+d[a],this.paramArray.join(this.paramSpliter),c,'/',this.origin)}}]),a}();
var fpc = new fpcCookie();
fpc.saveFpcCookie();