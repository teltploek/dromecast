define([
	'backbone',
	'../model/image'
], function (Backbone, Img) {
	'use strict';

	var ImageCollection = Backbone.Collection.extend({
		model: Img,
		url: '/Components/Domain/Product/service/GalleryImageService.ashx'
	});

	return new ImageCollection();
	
});