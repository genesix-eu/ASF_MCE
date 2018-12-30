(function(){Registry.require(["helper"],function(){var q={},r={},d=null,e=[],g=Registry.get("helper"),t=function(a){var b=a,c=Array.prototype.slice.call(arguments,1);1==c.length&&"Array"===g.toType(c[0])&&(c=c[0]);for(var f=/(^|_)0[a-zA-Z]+0(_|$)/,k=0;k<c.length;k++){var h=b.match(f);if(!h){console.log("getMessage(): wrong argument count!!!");break}b=b.replace(f,(h[1]?" ":"")+c[k]+(h[2]?" ":""))}return b.replace(/_/g," ")},y=function(a,b){var c=a.message;1==b.length&&"Array"===g.toType(b[0])&&(b=
b[0]);a.placeholders&&Object.keys(a.placeholders).forEach(function(f){try{var k=Number(a.placeholders[f].content.replace(/^\$/,""))-1,h;k<b.length?(h=b[k],c=c.replace("$"+f+"$",h)):console.log("i18n: invalid argument count on processing '"+c+"' with args "+JSON.stringify(b))}catch(d){console.log("i18n: error processing '"+c+"' with args "+JSON.stringify(b))}});return c},u=function(a){var b=[arguments[0]],c=[],f=function(a){for(var b=0;b<a.length;b++)"Array"===g.toType(a[b])?f(a[b]):c.push(String(a[b]))};
f(Array.prototype.slice.call(arguments,1));c.length&&b.push(c);return rea.i18n.getMessage.apply(this,b)},v=function(a){try{var b=Registry.getRaw("_locales/"+a+"/messages.json");if(b)return JSON.parse(b)}catch(c){console.log("i18n: parsing locale "+a+" failed!")}},p=function(a){a=a.concat("en");for(var b=0;b<a.length;b++){var c=a[b];if(c&&-1!==z.indexOf(c)&&(q=v(c)))return l||(r=v("en")||{}),c}return null},m=function(a){return a?g.map(a.replace(/-/g,"_").split("_"),function(a,c){return c?a.toUpperCase():
a.toLowerCase()}).join("_"):a},w=function(a,b){var c,f;b=b||(d?[d,d.split("_")[0]].concat(e).filter(function(a){return a}):e);g.each(b,function(b,d){g.each(a,function(a,e){var g=m(a),l=g.split(/_/)[0];if(g==b)return f=e,!1;l==b&&(void 0===c||d<c)&&(f=e,c=d)});if(void 0!==f)return!1});return f},x=[{name:"Arabic - \u200e\u202b\u0627\u0644\u0639\u0631\u0628\u064a\u0629\u202c\u200e",value:"ar"},{name:"Chinese (Simplified) - \u4e2d\u6587\uff08\u7b80\u4f53\u4e2d\u6587\uff09",value:"zh_CN"},{name:"Chinese (Traditional) - \u4e2d\u6587\uff08\u7e41\u9ad4\uff09",
value:"zh_TW"},{name:"Croatian - hrvatski",value:"hr"},{name:"Czech - \u010de\u0161tina",value:"cs"},{name:"English",value:"en"},{name:"French - fran\u00e7ais",value:"fr"},{name:"German - Deutsch",value:"de"},{name:"Hindi - \u0939\u093f\u0928\u094d\u0926\u0940",value:"hi"},{name:"Hungarian - magyar",value:"hu"},{name:"Indonesian - Indonesia",value:"id"},{name:"Italian - italiano",value:"it"},{name:"Japanese - \u65e5\u672c\u8a9e",value:"ja"},{name:"Korean - \ud55c\uad6d\uc5b4",value:"ko"},{name:"Norwegian - norsk",
value:"nb"},{name:"Polish - polski",value:"pl"},{name:"Portuguese (Brazil) - portugu\u00eas (Brasil)",value:"pt_BR"},{name:"Portuguese (Portugal) - portugu\u00eas (Portugal)",value:"pt_PT"},{name:"Russian - \u0440\u0443\u0441\u0441\u043a\u0438\u0439",value:"ru"},{name:"Serbian - \u0441\u0440\u043f\u0441\u043a\u0438",value:"sr"},{name:"Slovak - sloven\u010dina",value:"sk"},{name:"Spanish - espa\u00f1ol",value:"es"},{name:"Turkish - T\u00fcrk\u00e7e",value:"tr"},{name:"Ukrainian - \u0443\u043a\u0440\u0430\u0457\u043d\u0441\u044c\u043a\u0430",
value:"uk"},{name:"Vietnamese - Ti\u1ebfng Vi\u1ec7t",value:"vi"}],z=x.map(function(a){return a.value}),n="undefined"!==typeof rea,l=n?rea.i18n.native_support:!1;(function(){var a=m(n?rea.i18n.getUILanguage():navigator.language);if(a){var b=[a],c=a.split(/_/);c[0]!==a&&b.push(c[0]);b.forEach(function(a){e.unshift(a)})}d||l||(d=p(e));n&&rea.i18n.getAcceptLanguages(function(a){a.forEach(function(a){e.push(m(a))});d||l||(d=p(e))})})();Registry.register("i18n","5873",{getMessage:function(a){var b;
return d&&(b=q[a]||r[a])?y(b,Array.prototype.slice.call(arguments,1)):(b=u.apply(this,arguments))?b:Registry.isDevVersion("helper")?(b="#"+t.apply(this,arguments).replace(/ /g,"#")+"#",console.warn("i18n:"+b),b):t.apply(this,arguments)},getOriginalMessage:u,normalizeLocale:m,getTranslation:function(a,b){var c,d;if(a&&(d=a[b+"_i18n"])){a[b]&&(d=g.copy(d,{en:a[b]}));var e=Object.keys(d),h;void 0!==(h=w(e))&&(c=d[e[h]])}return c||a[b]},setLocale:function(a){"null"===a&&(a=null);a&&(a=m(a));!a&&l?d=a:
a!==d&&(d=p([a].concat(e).concat([d])),d!=a&&console.log("i18n: retrieving locale "+a+" failed!"))},getLocale:function(){return d},getUiLocale:function(){return m(d||n?rea.i18n.getUILanguage():e[0]||navigator.language||"en")},getBestLocale:w,supported:x})})})();