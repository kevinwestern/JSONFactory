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
	    var definition = definitions[name] || {};
	    properties = properties || {};
	    return merge(definition, properties);
	}

	return {
	    define: define,
	    build: build
	};
	
})();