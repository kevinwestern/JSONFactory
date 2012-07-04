(function (namespace) {
	var cloneArray = function (arr) {
		var clone = new Array(arr.length),
			i = 0, l = clone.length;

		while (i < l) {
			clone[i] = cloner(arr[i++]);
		}

		return clone;
	};

	var cloneObject = function (obj) {
		var clone = {},
			prop = null;

		for (prop in obj) {
			if (obj.hasOwnProperty(prop)) {
				clone[prop] = cloner(obj[prop]);
			}
		}

		return clone;
	};

	var cloner = function(what) {
		if (what instanceof Array) return cloneArray(what);
		else if (what instanceof Object) return cloneObject(what);
		else return what;
	};

	var merge = function (obj1, obj2) {
	    Object.keys(obj2).forEach(function(key){
		    if (obj2[key] instanceof Array) {
		        obj1[key] = Array.prototype.slice.call(obj2[key]);
		    } else if (obj2[key] instanceof Object) {
		        obj1[key] = merge({}, obj2[key]);
		    } else {
		        obj1[key] = obj2[key];
		    }
		});
	    return obj1;
	};

	var JSONFactory = (function(){

		var definitions = {};

		function define (name, definition){
		    definitions[name] = definition;
		}

		function build (name, properties) {
			if (!definitions.hasOwnProperty(name)) {
				throw new ReferenceError('Object Not Defined');
			}
		    var definition = cloner(definitions[name]);
		    properties = properties || {};
		    return merge(definition, properties);
		}

		return {
		    define: define,
		    build: build
		};
	})();

	if (typeof exports !== 'undefined') {
		namespace = exports;
	}
	else if (typeof namespace === 'undefined') {
		namespace = window;
	}

	namespace.JSONFactory = JSONFactory;
}());