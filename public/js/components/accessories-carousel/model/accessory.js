/*global define*/
define([
	'backbone'
], function (Backbone) {
	'use strict';

	var Accessory = Backbone.Model.extend({
		defaults: {
			ImageUrl: '',
			Link: '',
			Name: ''
		}
	});

	return Accessory;
});