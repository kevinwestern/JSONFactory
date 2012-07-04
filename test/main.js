var assert = require('assert'),
	JSONFactory = require('../main.js').JSONFactory,
	userDefinition = {
			firstname: 'John',
			lastname: 'Doe'
	};

JSONFactory.define('User', userDefinition);

describe('JSONFactory.define', function () {

	it ('should store the object under a given name', function () {
		var result = {};		

		result = JSONFactory.build('User');

		assert.deepEqual(result, userDefinition);
	});

});

describe('JSONFactory.build', function () {

	it('should throw an error when the requested object has not been defined', function () {
		assert.throws(function(){
			JSONFactory.build('DNE');
		}, ReferenceError, 'Object Not Defined');
	});

	it('should overwrite properties on the defined object if an object is passed to buid', function () {
		var result = JSONFactory.build('User', {
			firstname: 'Jane'
		});

		assert.equal(result.firstname, 'Jane');
	});

	it("modifying a built object shouldn't alter the original", function () {
		var intermediate = JSONFactory.build('User'),
			result = null;

		intermediate.firstname = 'Bob';
		intermediate.lastname = 'Jones';

		result = JSONFactory.build('User');

		assert.deepEqual(result, userDefinition);
	});
});