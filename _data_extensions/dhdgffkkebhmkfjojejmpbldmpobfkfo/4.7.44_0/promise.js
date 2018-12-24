(function(k){var c=function(b){var a=function(){var a,b,d=[];d.notify=function(a){d.forEach(function(b){b(a)})};var f=[];f._push=f.push;f.push=function(){f._push.apply(f,arguments);f.check()};f.check=function(){if(void 0!==a)for(var h;f.length;)if(h=f.shift(),void 0===h.state||h.state===a)b=("function"===typeof h.f?h.f.call(g,b):h.f)||b};var g={promise:function(){return g},done:function(a){f.push({state:!0,f:a});return g},fail:function(a){f.push({state:!1,f:a});return g},always:function(a){f.push({f:a});
return g},progress:function(a){d.push(a);return g},then:function(a,d,e){return c(function(c){[{fn:"done",forward:"resolve",f:a},{fn:"fail",forward:"reject",f:d},{fn:"progress",forward:"notify",f:e}].forEach(function(a){g[a.fn](function(){var d="function"===typeof a.f,e=d?a.f(b):void 0;e&&"function"===typeof e.promise?e.promise().done(c.resolve).fail(c.reject).progress(c.notify):c[a.forward].apply(c,d?[e]:arguments)})})}).promise()},each:function(a){return g.then(function(b){b instanceof Array||(b=
arguments);return c.when(b.map(function(b){return a(b)}))})},iterate:function(a){return g.then(function(b){b instanceof Array||(b=arguments);var d=0,e=c(),f=function(){if(d<b.length){var c=b[d++];(c=a(c))&&c.promise?c.promise().done(f).fail(e.reject):f()}else e.resolve(b)};f();return e.promise()})}};return{get:function(){return g},try_resolve:function(c){void 0===a&&(a=!0,b=c);f.check();return g},try_reject:function(c){void 0===a&&(a=!1,b=c);f.check();return g},do_notify:function(a){d.notify(a)}}}(),
d={promise:function(){return a.get()},resolve:function(){return a.try_resolve.apply(this,arguments)},reject:function(){return a.try_reject.apply(this,arguments)},notify:function(){return a.do_notify.apply(this,arguments)},consume:function(a){a.promise().done(d.resolve).fail(d.reject).progress(d.notify);return d.promise()}};b&&b(d);return d};c.Pledge=function(b){var a=c();a.resolve(b);return a.promise()};c.Breach=function(b){var a=c();a.reject(b);return a.promise()};c.onebyone=function(b){var a=[];
return b.reduce(function(b,e){var l=c();b.always(function(){e().done(function(b){a=a.concat(b instanceof Array?b:[b])}).fail(function(){a=a.concat(null)}).always(l.resolve)});return l.promise()},c.Pledge()).then(function(){return a})};c.or=function(b){var a,d=c(),e=function(){b.length?(a=b.shift())&&c.Pledge().then(a).done(function(a){d.resolve(a)}).fail(e):d.reject()};e();return d.promise()};c.sidebyside=function(b){b instanceof Array||(b=arguments);var a=c(),d=b.length;d?b.forEach(function(b){b&&
b.promise&&b.promise().always(function(){0===--d&&a.resolve()})}):a.resolve();return a.promise()};c.when=function(b){b instanceof Array||(b=arguments);var a=c(),d=b.length,e=[];d?b.forEach(function(b){b&&b.promise?b.promise().fail(function(){a.reject(e);d=-1}).done(function(b){e.push(b);0===--d&&a.resolve(e)}):console.warn("promise: incompatible object given to when()",b)}):a.resolve(e);return a.promise()};c.sleep=function(b){var a=c();window.setTimeout(a.resolve,b);return a.promise()};k.Registry?
k.Registry.register("promise","5873",function(){return c}):"undefined"!==typeof require?module.exports.Deferred=c:k.Deferred=c})("undefined"!==typeof window?window:global);
