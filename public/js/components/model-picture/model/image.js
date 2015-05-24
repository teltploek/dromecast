/*global define*/
define([
	'backbone'
], function (Backbone) {
	'use strict';

	var Img = Backbone.Model.extend({
		defaults: {
			ImageUrl: ''
		}
	});

	return Img;
});