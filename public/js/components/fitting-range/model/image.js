/*global define*/
define([
	'backbone'
], function (Backbone) {
	'use strict';

	var Img = Backbone.Model.extend({
		defaults: {
			Alt: '',
			ImageUrl: ''
		}
	});

	return Img;
});