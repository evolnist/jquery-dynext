# jQuery DynamicExtend plugin vBeta1.0.0

_Note: This plugin use jQuery Deferred object. Requires jQuery version 1.5.0._

----

You can do jQuery.fn.extend() dynamically, and load external file.


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
			before: beforeCallbacks,
			after: afterCallbacks
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
