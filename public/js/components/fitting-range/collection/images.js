define([
	'backbone',
	'../model/image'
], function (Backbone, Img) {
	'use strict';

	var ImgCollection = Backbone.Collection.extend({
		model: Img,
		url: '/Components/Domain/Product/service/FittingRangeService.ashx'
	});

	return new ImgCollection();
	
});