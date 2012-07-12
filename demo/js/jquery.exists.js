/*!
 * jQuery Exists Plugin
 *
 * Copyright 2012, evol-ni corporation
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * @author: Kawamoto Koo (http://www.evol-ni.com/)
 * @version: Beta1.0.0
 */
(function($){

	$.fn.exists = function(){
		return (0 < this.length);
	};

})(jQuery);
