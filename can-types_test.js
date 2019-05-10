var QUnit = require('steal-qunit');
var types = require('can-types');
var DOCUMENT = require('can-globals/document/document');
var namespace = require('can-namespace');
var clone = require('steal-clone');

QUnit.module('can-types');

QUnit.test('types.isConstructor', function(assert) {
	var Constructor = function(){};
	Constructor.prototype.method = function(){};

	assert.ok(types.isConstructor(Constructor));
	assert.ok(!types.isConstructor(Constructor.prototype.method));

});

// Only run this in an environment with a document
if(DOCUMENT()) {

	QUnit.test('types.wrapElement', function(assert) {
		var el = DOCUMENT().createElement('div');

		assert.equal(el, types.wrapElement(el), 'is an identity function by default');
	});

	QUnit.test('types.unwrapElement', function(assert) {
		var el = DOCUMENT().createElement('div');

		assert.equal(el, types.unwrapElement(el), 'is an identity function by default');
	});

}

QUnit.test('sets can-namespace.types', function(assert) {
	assert.equal(namespace.types, types);
});

QUnit.test('should throw if can-namespace.types is already defined', function(assert) {
	var done = assert.async();
	clone({
		'can-namespace': {
			default: {
				types: {}
			},
			__useDefault: true
		}
	})
	.import('./can-types')
	.then(function() {
		assert.ok(false, 'should throw');
		done();
	})
	.catch(function(err) {
		var errMsg = err && err.message || err;
		assert.ok(errMsg.indexOf('can-types') >= 0, 'should throw an error about can-types');
		done();
	});
});
