define([
	'backbone',
	'components/color-picker-housing/model/color'
], function (Backbone, Color) {
	'use strict';

	var ColorCollection = Backbone.Collection.extend({
		model: Color,
		url: '/Components/Domain/Product/service/GridColorService.ashx'
	});

	return new ColorCollection();
	
});