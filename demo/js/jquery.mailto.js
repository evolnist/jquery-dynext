/*!
 * jQuery Mailto Plugin
 *
 * Replace '<p>info_at_example_dot_com</p>' to '<p><a href="mailto:info@example.com">info@example.com</a></p>'
 *
 * Copyright 2012, evol-ni corporation
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * @author: Kawamoto Koo (http://www.evol-ni.com/)
 * @version: Beta1.0.0
 */
(function($){

	$.fn.mailto = function(){
		this.each(function(i){
			var element = $(this);
			var mail = element.text().replace(/[_ ]at[_ ]/, '@').replace(/[_ ]dot[_ ]/, '.');
			element.empty().append(
				$('<a>').attr({
					href: 'mailto:' + mail
				}).text(mail)
			);
		});
		return this;
	};

})(jQuery);
