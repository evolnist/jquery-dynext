(function($){

function main() {
	var app = new App();
	app.mailto();
}

$(document).ready(function(){
	$.when(
		$.getScript('../jquery.dynext.js')
	).done(function(){
		$.dynamicExtend({
			exists: 'js/jquery.exists.js',
			mailto: 'js/jquery.mailto.js'
		});
	}).pipe(function(){
		return $.loadFile('js/lib/App.js');
	}).done(function(){
		main();
	});
});

})(jQuery);
