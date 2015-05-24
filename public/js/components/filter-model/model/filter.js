/*global define*/
define([
	'backbone'
], function (Backbone) {
	'use strict';

	var Filter = Backbone.Model.extend({
		defaults: {
			Id: null,
			Name: '',
			ImageUrl: '',
			Selected: false
		}
	});

	return Filter;
});