Registry.require("promise",function(){var m=Registry.get("promise"),b,g,r=function(a,e,d,h,c,f,n){var k=document.createElement("img");k.onload=function(){var a=null,a=g?g:document.createElement("canvas");a.height=d;a.width=e;g=a;b=g.getContext("2d");f&&b.scale(f,f);b.drawImage(k,h,c);k.parentNode&&k.parentNode.removeChild(k);k=null;n&&n()};k.src=a},l=function(a,e,d,h){h="rgba("+h.join(",")+", 1)";b.fillStyle=h;b.beginPath();b.arc(a,e,d,0,2*Math.PI,!0);b.fill()},p=function(a,e,d,h,c,f){null==c&&(c=
!0);c?(b.fillStyle="rgba("+f.join(",")+", 0.99)",b.fillRect(a,e,d,h)):(b.fillStyle="rgb("+f.join(",")+", 1)",b.beginPath(),b.moveTo(a,e),b.lineTo(a+d,e),b.lineTo(a+d,e+h),b.lineTo(a,e+h),b.lineTo(a,e),b.stroke())},q=function(a,e,d,b,c,f){l(a+c,e+c,c,f);l(d-c,e+c,c,f);l(a+c,b-c,c,f);l(d-c,b-c,c,f);p(a+c,e,d-a-2*c,b-e,!0,f);p(a,e+c,d-a,b-e-2*c,!0,f)};Registry.register("icon","5873",{toPNG:function(){return g.toDataURL()},getDataUriFromUrl:function(a){var b=m(),d=document.createElement("img"),
h=!1,c=null,f=document.body||document.documentElement||document;f.appendChild(d);var g=function(){c&&window.clearTimeout(c);h||b.reject()},c=window.setTimeout(function(){c=null;g();h=!0},5E3);d.onload=function(){c&&window.clearTimeout(c);var a,g;try{g=document.createElement("canvas"),g.width=d.width,g.height=d.height,g.getContext("2d").drawImage(d,0,0),a=g.toDataURL(),f.removeChild(d),d=null}catch(l){}h||b.resolve(a)};d.onerror=g;d.src=a;return b.promise()},createIconEx:function(a){var e=m();r(rea.extension.getURL("images/icon128.png"),
140,140,6,6,1,function(){var d=116-(10<a?14:0)-(100<a?14:0)-(1E3<a?14:0)-(1E4<a?14:0);q(d,0,140,25,4,[200,0,0]);q(d+3,3,137,22,4,[190,0,0]);d+=4;b.font="22pt Arial bold";b.fillStyle="rgba("+[240,250,240].join()+", 1)";b.fillText(a,d,22);e.resolve(g.toDataURL())});return e.promise()}})});
