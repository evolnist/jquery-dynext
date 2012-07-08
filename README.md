# jQuery DynamicExtend plugin vBeta1.0.0

_Note: This plugin use jQuery Deferred object. Requires jQuery version 1.5.0._

----

You can do `jQuery.fn.extend()` dynamically, and load external file.


## $.dynamicExtend()

When the method is called, it dynamically loads the script.

"useAjax" is valid in only script, but step execution maybe unavailable.

	// Simple example
	$.dynamicExtend({
		method: '/path/to/script.js'
	});
	
	// Specify before/after callbacks example
	$.dynamicExtend({
		method: {
			url: '/path/to/script',
			before: beforeCallback, // callback or url list
			after: afterCallback // callback or url list
		}
	});


## $.loadFile()

Load external file, support script(.js) and style(.css).

Step execution of the script is available.
"useAjax" is valid in only script, but step execution maybe unavailable.

	// Simple example (type auto detect by file extension)
	$.loadFile('/path/to/script.js').done(callback);
	
	// Specify type example
	$.loadFile({
		url: '/path/to/script',
		type: 'script'
	});
	
	// Load CSS example (type auto detect by file extension)
	$.loadFile('/path/to/style.css');


---

Code of someone.

/index.html

	<script type="text/javascript" src="/js/jquery.min.js"></script>
	<script type="text/javascript" src="/js/common.js"></script>

/js/common.js

	function main() {
		var app = new App();
		app.lightbox();
		app.tile('.twoColumns .entry', 2);
	}
	
	$(document).ready(function(){
		$.when(
			$.getScript('/js/jquery.dynext.js')
		).done(function(){
			$.dynamicExtend({
				tile: '/js/jquery.tile.js',
				lightbox: {
					url: '/js/jquery.lightbox.js',
					after: [
						'/css/jquery.lightbox.css'
					]
				}
			});
		}).pipe(function(){
			return $.loadFile('/js/lib/App.js');
		}).done(function(){
			main();
		});
	});

/js/lib/App.js

	var App = (function(){
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
