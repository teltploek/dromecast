/*global define*/
define([
	'backbone'
], function (Backbone) {
	'use strict';

	var Filter = Backbone.Model.extend({
		defaults: {
			Id: null,
			Name: '',
			Selected: false
		}
	});

	return Filter;
});