define([
	'backbone',
	'../model/color'
], function (Backbone, Color) {
	'use strict';

	var ColorCollection = Backbone.Collection.extend({
		model: Color,
		url: '/Components/Domain/Product/service/HouseColorService.ashx'
	});

	return new ColorCollection();
	
});