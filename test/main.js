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

	it("should not alter the defined object once built", function () {
		var intermediate = JSONFactory.build('User'),
			result = null;

		intermediate.firstname = 'Bob';
		intermediate.lastname = 'Jones';

		result = JSONFactory.build('User');

		assert.deepEqual(result, userDefinition);
	});


	it("should not allow altering of passed in properties once built", function () {
		var credentials = {
				username: 'super',
				password: 'secret'
		},
			creditcards = [{
				type: 'visa',
				number: '1234567890'
		}],
			intermediate = JSONFactory.build('User', {
				'creditcards': creditcards,
				'credentials': credentials
			});

		intermediate.creditcards[0].type = 'discover';
		intermediate.credentials.password = 'easy';

		assert.equal(creditcards[0].type, 'visa');
		assert.equal(credentials.password, 'secret');
	});
});