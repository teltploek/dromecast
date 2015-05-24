/*global define*/
define([
	'backbone'
], function (Backbone) {
	'use strict';

	var Color = Backbone.Model.extend({
		defaults: {
			Id: null,
			Name: '',
			Hex: '',
			Selected: false
		}
	});

	return Color;
});