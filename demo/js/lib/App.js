var App;

(function($){

App = (function(){
	function Class() {
		this.construct();
	}
	
	Class.prototype.construct = function() {
	};
	
	Class.prototype.lightBox = function() {
		if (0 < $('a[rel*=lightbox]').length) {
			$('a[rel*=lightbox]').lightBox(); // The external file will be loaded at this time.
		}
	};
	
	Class.prototype.tile = function(selector, columns) {
		if (0 < $(selector).length) {
			$(selector).tile(columns); // The external file will be loaded at this time.
		}
	};
	
	return Class;
})();

})(jQuery);
