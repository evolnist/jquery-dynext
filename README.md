# jQuery DynamicExtend plugin vBeta1.0.0

_Note: This plugin use jQuery Deferred object. Requires jQuery version 1.5.0._

----

You can do jQuery.fn.extend() dynamically, and load external file.


## $.dynamicExtend()

When the method is called, it dynamically loads the script.

"useAjax" is valid in only script, but step execution maybe unavailable.

$.dynamicExtend({
	method: '/path/to/script.js'
});

$.dynamicExtend({
	method: {
		url: '/path/to/script.js',
		before: beforeCallbacks,
		after: afterCallbacks
	}
});


## $.loadFile()

Load external file, support script(.js) and style(.css).

Step execution of the script is available.
"useAjax" is valid in only script, but step execution maybe unavailable.

$.loadFile('/path/to/script.js').done(function(){});

$.loadFile({
	url: '/path/to/script',
	type: 'script'
});

$.loadFile('/path/to/style.css');
