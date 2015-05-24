define([
	'backbone',
	'../model/text'
], function (Backbone, Txt) {
	'use strict';

	var TextCollection = Backbone.Collection.extend({
		model: Txt,
		url: '/Components/Domain/Product/service/HearingAidTitleService.ashx'
	});

	return new TextCollection();
	
});