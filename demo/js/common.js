(function($){

function main() {
	var app = new App();
	app.lightBox();
	app.tile('.twoColumns .entry', 2);
}

$(document).ready(function(){
	$.when(
		$.getScript('../jquery.dynext.js')
	).done(function(){
		$.dynamicExtend({
			tile: 'js/jquery.tile.js',
			lightBox: {
				url: 'js/jquery.lightbox.min.js',
				after: [
					'css/jquery.lightbox.css'
				]
			}
		});
	}).pipe(function(){
		return $.loadFile('js/lib/App.js');
	}).done(function(){
		main();
	});
});

})(jQuery);
