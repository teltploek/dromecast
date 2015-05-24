define([
	'backbone',
	'../model/filter'
], function (Backbone, Filter) {
	'use strict';

	var FilterCollection = Backbone.Collection.extend({
		model: Filter,
		url: '/Components/Domain/Product/service/CategoryFilterService.ashx'
	});

	return new FilterCollection();
	
});