define([
	'backbone',
	'../model/filter'
], function (Backbone, Filter) {
	'use strict';

	var FilterCollection = Backbone.Collection.extend({
		model: Filter,
		url: '/Components/Domain/Product/service/TypeFilterService.ashx'
	});

	return new FilterCollection();
	
});