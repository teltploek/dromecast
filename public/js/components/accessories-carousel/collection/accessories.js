define([
	'backbone',
	'../model/accessory'
], function (Backbone, Accessory) {
	'use strict';

	var AccessoriesCollection = Backbone.Collection.extend({
		model: Accessory,
		url: '/Components/Domain/Product/service/AccessoryService.ashx'
	});

	return new AccessoriesCollection();
	
});