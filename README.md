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


Live versions of demos from this repository can be found at [http://evolnist.github.com/jquery-dynext/demos/step-by-step.html] (http://evolnist.github.com/jquery-dynext/demos/step-by-step.html).

<p>The beta1 version of jQuery DynamicExtend is available on CDN at:
<ul>
<li><a href="http://ajax.evol-ni.com/ajax/jquery.dynamicextend/beta1/jquery.dynext.js">http://ajax.evol-ni.com/ajax/jquery.dynamicextend/beta1/jquery.dynext.js</a></li>
<li><a href="http://ajax.evol-ni.com/ajax/jquery.dynamicextend/beta1/jquery.dynext.min.js">http://ajax.evol-ni.com/ajax/jquery.dynamicextend/beta1/jquery.dynext.min.js</a></li>
</ul></p>

