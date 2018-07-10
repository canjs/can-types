/*can-types@1.2.0#can-types*/
define([
    'require',
    'exports',
    'module',
    'can-namespace',
    'can-reflect',
    'can-symbol',
    'can-log/dev'
], function (require, exports, module) {
    'use strict';
    var namespace = require('can-namespace');
    var canReflect = require('can-reflect');
    var canSymbol = require('can-symbol');
    var dev = require('can-log/dev');
    var types = {
        isMapLike: function (obj) {
            return canReflect.isObservableLike(obj) && canReflect.isMapLike(obj);
        },
        isListLike: function (obj) {
            return canReflect.isObservableLike(obj) && canReflect.isListLike(obj);
        },
        isPromise: function (obj) {
            return canReflect.isPromise(obj);
        },
        isConstructor: function (func) {
            return canReflect.isConstructorLike(func);
        },
        isCallableForValue: function (obj) {
            return obj && canReflect.isFunctionLike(obj) && !canReflect.isConstructorLike(obj);
        },
        isCompute: function (obj) {
            return obj && obj.isComputed;
        },
        get iterator() {
            return canSymbol.iterator || canSymbol.for('iterator');
        },
        DefaultMap: null,
        DefaultList: null,
        queueTask: function (task) {
            var args = task[2] || [];
            task[0].apply(task[1], args);
        },
        wrapElement: function (element) {
            return element;
        },
        unwrapElement: function (element) {
            return element;
        }
    };
    if (namespace.types) {
        throw new Error('You can\'t have two versions of can-types, check your dependencies');
    } else {
        module.exports = namespace.types = types;
    }
});