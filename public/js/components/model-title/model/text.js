/*global define*/
define([
	'backbone'
], function (Backbone) {
	'use strict';

	var Txt = Backbone.Model.extend({
		defaults: {
			ProductTitle: ''
		}
	});

	return Txt;
});