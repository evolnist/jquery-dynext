/*!
 * jQuery DynamicExtend Plugin
 * https://github.com/evolnist/jquery-dynext
 *
 * You can do jQuery.fn.extend() dynamically, and load external file.
 *
 * Copyright 2012, evol-ni corporation
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * @author: Kawamoto Koo (http://www.evol-ni.com/)
 * @version: Beta1.0.0
 */
(function($){

$.extend({

	/**
	 * When the method is called, it dynamically loads the script.
	 * 
	 * "useAjax" is valid in only script, but step execution maybe unavailable.
	 */
	dynamicExtend: function(methods, useAjax){
		dynext.extend(methods, useAjax);
		return this;
	},

	/**
	 * Load external file, support script(.js) and style(.css).
	 * 
	 * Step execution of the script is available.
	 * "useAjax" is valid in only script, but step execution maybe unavailable.
	 *
	 * @return: Deferred's promise
	 */
	loadFile: function(opts, useAjax){
		return dynext.load(opts, useAjax);
	}
});

var DynamicExtend = (function(){
	function Class() {
		this.construct();
	}

	Class.prototype.cachedPromises;
	
	Class.prototype.construct = function() {
		this.cachedPromises = {};
	};
	
	Class.prototype.extend = function(methods, useAjax) {
		var _this = this;

		var fns = {};
		$.each(methods, function(method, options){
			fns[method] = function(){
				var _t = this, _a = arguments;

				var pushQueue = function(){
					var _t = this, _a = arguments;
					var url = (typeof options == 'object') ? options.url : options;
					_this.cache(url).done(function(){
						$.fn[method].apply(_t, _a);
					});
				};
				$.fn[method] = pushQueue;

				$.loadFile(options, useAjax).done(function(){
					if ($.fn[method] == pushQueue) {
						$.fn[method] = null;
						return;
					}
					$.fn[method].apply(_t, _a);
				});
				return this;
			};
		});
		$.fn.extend(fns);
	};
	
	Class.prototype.load = function(opts, useAjax) {
		var options = {
			url: null,
			type: null,
			before: null,
			after: null
		};
		if (typeof opts == 'object') {
			$.extend(options, opts);
		}
		else {
			options.url = opts;
		}

		var dfd = $.Deferred();
		if (!options.url) {
			return dfd.promise().reject();
		}
		else if (this.cache(options.url)) {
			return this.cache(options.url);
		}
		this.cache(options.url, dfd.promise());

		this.before(options.before);
		this.after(options.after, dfd);

		if (options.type == 'style' || options.url.match(/\.css(\?|$)/)) {
			this.style(options.url, dfd);
			return this.cache(options.url);
		}
		else if (options.type == 'script' || options.url.match(/\.js(\?|$)/)) {
			if (useAjax) {
				return $.getScript(options.url);
			}
			else {
				this.script(options.url, dfd);
				return this.cache(options.url);
			}
		}
	};

	Class.prototype.cache = function(url, promise) {
		if (!url) {
			return;
		}
		else if (!promise) {
			if (this.cachedPromises[url]) {
				return this.cachedPromises[url];
			}
			else {
				return null;
			}
		}
		else {
			this.cachedPromises[url] = promise;
		}
	};

	Class.prototype.before = function(urls) {
		if (!urls) {
			return;
		}
		if(typeof urls == 'function') {
			urls.call();
		}
		else if (typeof urls == 'object') {
			this.chain(urls);
		}
	};

	Class.prototype.after = function(urls, dfd) {
		var _this = this;

		if (!urls) {
			return;
		}
		if(typeof urls == 'function') {
			dfd.done(urls);
		}
		else if (typeof urls == 'object') {
			dfd.done(function(){
				_this.chain(urls);
			});
		}
	};

	Class.prototype.style = function(url, dfd) {
		var link = document.createElement('link');
		link.rel = 'stylesheet';
		link.type = 'text/css';
		link.href = url;
		this.setLoadEvent(link, function(){
			dfd.resolve();
		});
		document.getElementsByTagName('head')[0].appendChild(link);
	};

	Class.prototype.script = function(url, dfd) {
		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = url;
		this.setLoadEvent(script, function(){
			dfd.resolve();
		});
		document.getElementsByTagName('head')[0].appendChild(script);
	};

	Class.prototype.setLoadEvent = function(element, callback) {
		if (!element.addEventListener) { // for IE8
			element.onreadystatechange = function() {
				if (element.readyState == 'loaded' || element.readyState == 'complete') {
					callback.apply(element);
				}
			};
		}
		else {
			element.addEventListener('load', callback, false);
		}
	};
	
	Class.prototype.chain = function(urls) {
		var promise = null;
		for (var i in urls) {
			(function(url){
				if (!promise) {
					promise = $.loadFile(url);
				}
				else {
					promise = promise.pipe(function(){
						return $.loadFile(url);
					});
				}
			})(urls[i]);
		}
	};

	return Class;
})();

var dynext = new DynamicExtend();

})(jQuery);
