var namespace = require('can-namespace');
var canReflect = require('can-reflect');
var canSymbol = require('can-symbol');
var dev = require('can-util/js/dev/dev');

/**
 * @module {Object} can-types
 * @parent can-infrastructure
 * @description A stateful container for CanJS type information.
 *
 * @body
 *
 * ## Use
 *
 * `can-types` exports an object with placeholder functions that
 * can be used to provide default types or test if something is of a certain type.
 *
 * This is where the sausage of loose coupling modules takes place.
 * Modules that provide a type will overwrite one or multiple of these functions so
 * they take into account the new type.
 *
 * For example, `can-define/map/map` might overwrite `isMapLike` to return true
 * if the object is an instance of Map:
 *
 * ```js
 * var types = require("can-types");
 * var oldIsMapLike = types.isMapLike;
 * types.isMapLike = function(obj){
 *   return obj instanceof DefineMap || oldIsMapLike.apply(this, arguments);
 * };
 * types.DefaultMap = DefineMap;
 * ```
 */

var types = {
	/**
	 * @function can-types.isMapLike isMapLike
	 * @signature `types.isMapLike(obj)`
	 *   Returns true if `obj` is an observable key-value pair type object.
	 *
	 * @return {Boolean} `true` if the object is map like.
	 */
	isMapLike: function(obj){
		//!steal-remove-start
		dev.warn('can-types.isMapLike(obj) is deprecated, please use `canReflect.isObservableLike(obj) && canReflect.isMapLike(obj)` instead.');
		//!steal-remove-end
		return canReflect.isObservableLike(obj) && canReflect.isMapLike(obj);
	},
	/**
	 * @function can-types.isListLike isListLike
	 * @signature `types.isListLike(obj)`
	 *   Returns true if `obj` is an observable list-type object with numeric keys and a length.
	 *
	 * @return {Boolean} `true` if the object is list like.
	 */
	isListLike: function(obj){
		//!steal-remove-start
		dev.warn('can-types.isListLike(obj) is deprecated, please use `canReflect.isObservableLike(obj) && canReflect.isListLike(obj)` instead.');
		//!steal-remove-end
		return canReflect.isObservableLike(obj) && canReflect.isListLike(obj);
	},
	/**
	 * @function can-types.isPromise isPromise
	 * @signature `types.isPromise(obj)`
	 *   Returns true if `obj` is a Promise.
	 *
	 * @return {Boolean} `true` if the object is a Promise.
	 */
	isPromise: function(obj){
		//!steal-remove-start
		dev.warn('can-types.isPromise is deprecated, please use canReflect.isPromise instead.');
		//!steal-remove-end
		return canReflect.isPromise(obj);
	},
	/**
	 * @function can-types.isConstructor isConstructor
	 * @signature `types.isConstructor(obj)`
	 *   Returns true if `obj` looks like a constructor function to be called with `new`.
	 *
	 * @return {Boolean} `true` if the object is a constructor function.
	 */
	isConstructor: function(func){
		//!steal-remove-start
		dev.warn('can-types.isConstructor is deprecated, please use canReflect.isConstructorLike instead.');
		//!steal-remove-end
		return canReflect.isConstructorLike(func);
	},
	/**
	 * @function can-types.isCallableForValue isCallableForValue
	 * @signature `types.isConstructor(obj)`
	 *   Returns true if `obj` looks like a function that should be read to get a value.
	 *
	 * @return {Boolean} `true` if the object should be called for a value.
	 */
	isCallableForValue: function(obj){
		//!steal-remove-start
		dev.warn('can-types.isCallableForValue is deprecated, please check for the existence of canSymbol.for("getValue") instead.');
		//!steal-remove-end
		return obj && obj[canSymbol.for("getValue")];
	},
	/**
	 * @function can-types.isCompute isCompute
	 * @signature `types.isCompute(obj)`
	 *   Returns true if `obj` is a [can-compute].
	 *
	 * @return {Boolean} `true` if the object is a [can-compute].
	 */
	isCompute: function(obj){
		//!steal-remove-start
		dev.warn('can-types.isCompute is deprecated.');
		//!steal-remove-end
		return obj && obj.isComputed;
	},

	/**
	 * @property {Symbol} can-types.iterator iterator
	 * @option {Symbol}
	 *
	 * Used to implement an iterable object that can be used with [can-util/js/each/each]. In browsers that support for/of this will be Symbol.iterator; in older browsers it will be a string, but is still useful with [can-util/js/each/each].
	 */
	get iterator() {
		//!steal-remove-start
		dev.warn('can-types.iterator is deprecated, use canSymbol.for("iterator") instead.');
		//!steal-remove-end
		return canSymbol.for("iterator");
	},
	/**
	 * @property {Map} can-types.DefaultMap DefaultMap
	 *
	 * @option {Map}
	 *
	 *   The default map type to create if a map is needed.  If both [can-map] and [can-define/map/map]
	 *   are imported, the default type will be [can-define/map/map].
	 */
	DefaultMap: null,
	/**
	 * @property {can-connect.List} can-types.DefaultList DefaultList
	 *
	 * @option {can-connect.List}
	 *
	 *   The default list type to create if a list is needed. If both [can-list] and [can-define/list/list]
	 *   are imported, the default type will be [can-define/list/list].
	 */
	DefaultList: null,
	/**
	 * @function can-types.wrapElement wrapElement
	 * @signature `types.wrapElement(element)`
	 *   Wraps an element into an object useful by DOM libraries ala jQuery.
	 *
	 *   @param {Node} element Any object inheriting from the [Node interface](https://developer.mozilla.org/en-US/docs/Web/API/Node).
	 *   @return {{}} A wrapped object.
	 */
	/**
	 * @function can-types.queueTask queueTask
	 * @signature `types.queueTask(task)`
	 *   Run code that will be queued at the end of the current batch.
	 *   @param {Array} task
	 */
	queueTask: function(task){
		var args = task[2] || [];
		task[0].apply(task[1], args);
	},
	wrapElement: function(element){
		return element;
	},
	/**
	 * @function can-types.unwrapElement unwrapElement
	 * @signature `types.unwrapElement(object)`
	 *   Unwraps an object that contains an element within.
	 *
	 *   @param {{}} object Any object that can be unwrapped into a Node.
	 *   @return {Node} A Node.
	 */
	unwrapElement: function(element){
		return element;
	}
};

if (namespace.types) {
	throw new Error("You can't have two versions of can-types, check your dependencies");
} else {
	module.exports = namespace.types = types;
}
