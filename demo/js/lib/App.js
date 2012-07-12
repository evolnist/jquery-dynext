var App;

(function($){

	App = (function(){
		function Class() {
			this.construct();
		}
		
		Class.prototype.construct = function() {
		};
		
		Class.prototype.mailto = function() {
			if ($('.mailto').exists()) { // 'jquery.exists.js' will be loaded at this time.
				$('.mailto').mailto(); // 'jquery.mailto.js' will be loaded at this time.
			}
		};
		
		return Class;
	})();

})(jQuery);
