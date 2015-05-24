/*global define*/
define([
	'backbone'
], function (Backbone) {
	'use strict';

	var Txt = Backbone.Model.extend({
		defaults: {
			TechnicalInformationLink:   '',
      CtaLink:                    '',
      ProductDescription:        	'',
      ProductDisplayDescription: 	''
		}
	});

	return Txt;
});