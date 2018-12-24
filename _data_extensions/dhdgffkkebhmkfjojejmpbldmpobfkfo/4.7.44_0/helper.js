Registry.require("convert",function(){var r=Registry.get("convert"),n=function(a,c){void 0==c&&(c=[]);var b=new RegExp("(\\"+"/.+?|()[]{}\\".split("").concat(c).join("|\\")+")","g");return a.replace(b,"\\$1")},h=function(a){return({}.toString.apply(a).match(/\s([a-z|A-Z]+)/)||[null,a&&"INPUT"===a.nodeName?"HTMLInputElement":"Object"])[1]},f=function(a,c){var b=h(a);if("Array"===b||"NodeList"===b)for(b=0;b<a.length&&!1!==c(a[b],b);b++);else if("XPathResult"===b)for(b=a.iterateNext();b&&!1!==c(b);)b=
a.iterateNext();else for(var d in a)if(a.hasOwnProperty(d)&&!1===c(a[d],d))break},m=function(a,c,b,d){if("Array"===h(b)){var e={};b.forEach(function(a){e[a]=!0});b=e}f(b||a,function(e,g){if(!b||b.hasOwnProperty(g)){var f,k=a[g],l=h(k);"Undefined"==l||b&&d&&(f=h(b[g]))&&f!==l&&("Array"===f||"Object"===f)||("Object"==l?(c[g]={},m(k,c[g],b?b[g]:null)):"Array"==l?(c[g]=[],m(k,c[g])):c[g]=k)}});return c},p=function(a){return document.body?document.body.innerText:0<a.childNodes.length?p(a.childNodes[a.childNodes.length-
1]):a.innerText},t=function(){var a={objs:{},push:function(c,b){0!==b&&1!==b&&(b=0);var d=q();a.objs[d]={fn:c,prio:b};return d},remove:function(c){delete a.objs[c]},get:function(c){for(var b=[],d=0;1>=d;d++)for(var e in a.objs)a.objs.hasOwnProperty(e)&&(a.objs[e].prio!==d||void 0!==c&&e!=c||b.push(a.objs[e].fn));return void 0===c?b:b[0]},finalize:function(c){if(void 0===c){c=a.get();for(var b=0;b<c.length;b++)c[b]()}else return a.objs[c]&&(b=a.objs[c].fn(),delete a.objs[c]),b}};return a}(),q=function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,
function(a){var c=16*Math.random()|0;return("x"==a?c:c&3|8).toString(16)})};Registry.register("helper","5873",{createUniqueId:function(a,c){return r.Base64.encode(a+"_"+c).replace(/[^0-9a-zA-Z_\-]/g,"")},getStringBetweenTags:function(a,c,b){var d=a.indexOf(c);if(-1==d)return"";if(!b)return a.substr(d+c.length);b=a.substr(d+c.length).indexOf(b);return-1==b?"":a.substr(d+c.length,b)},escapeForRegExpURL:n,escapeForRegExp:function(a,c){return n(a,["*"])},isLocalImage:function(a){var c=rea.extension.getURL("background.js"),
c=c.replace("background.js","")+"images/";return a.length>=c.length&&c==a.substr(0,c.length)},getUrlArgs:function(a){var c={},b=window.location.search.replace(/^\?/,""),d=window.location.hash.replace(/^#/,"");b?a&&d&&(b=b+"&"+d):b=d;a=b.split("&");for(var e,b=0;b<a.length;b++)e=a[b].split("="),2!=e.length&&(d=e[0],e=e.slice(1).join("="),e=[d,e]),c[e[0]]=decodeURIComponent(e[1]);return c},getSource:p,alert:function(a){window.setTimeout(function(){alert(a)},1)},confirm:function(a,c){window.setTimeout(function(){var b=
confirm(a);c(b)},1)},prompt:function(a,c,b){window.setTimeout(function(){var d=prompt(a,c);b(d)},1)},filter:function(a,c){return a&&c?(a.match(c)||[]).join(""):""},toType:h,each:f,select:function(a,c){var b=[];f(a,function(a){c(a)&&b.push(a)});return b},map:function(a,c){var b=[];f(a,function(a,e){b.push(c(a,e))});return b},values:function(a){return(Object.values||function(a){return Object.keys(a).map(function(b){return a[b]})})(a)},insert:function(a,c,b,d){return a.slice(0,c)+d+a.slice(c+Math.abs(b))},
assign:function(a,c){a=a||{};Object.keys(c).forEach(function(b){a[b]=c[b]});return a},clean:t,sleep:function(a){for(var c=Date.now();Date.now()-c<a;)for(var b=0;100>b;b++);},copy:m,adiff:function(a,c,b){b=b||"both";var d=[];"both"==b?a.concat(c).forEach(function(b){-1!=a.indexOf(b)&&-1!=c.indexOf(b)||d.push(b)}):"notinfirst"==b&&c.forEach(function(b){-1==a.indexOf(b)&&d.push(b)});return d},getDebouncer:function(a){return function(){var c={},b=a||1E3,d={clear:function(){f(c,function(a,b){window.clearTimeout(a)});
c={}},is:function(a,b){var g=!!c[a];b&&d.add(a);return g},add:function(a,f){d.is(a)&&window.clearTimeout(c[a]);c[a]=window.setTimeout(function(){delete c[a]},f||b)}};return d}()},createUUID:q,decodeHtml:function(a){return a.replace(/(?:&#x([a-fA-F0-9]+);|&#([0-9]+);)/g,function(a,b,d){return b?String.fromCharCode(parseInt(b,16)):String.fromCharCode(parseInt(d,10))})},encodeHtml:function(a){return a.replace(/[\u00A0-\u2666<>]/g,function(a){return"&#"+a.charCodeAt(0)+";"})},safeFileName:function(a){return a.replace(/[:\?\/\\\*<>]/g,
"-")},staticVars:{visible:void 0,invisible:"display: none;",visible_move:void 0,invisible_move:"position:absolute; left: -20000px; top: -200000px; width: 1px; height: 1px;"}})});
