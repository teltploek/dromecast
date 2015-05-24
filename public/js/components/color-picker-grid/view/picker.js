define([
	'facade',
	'components/color-picker-housing/view/picker',
	'../collection/colors',
], function (facade, PickerView, Colors) {

	'use strict';
	
	return PickerView.extend({
		componentName : 'color-picker-grid',
		collection: Colors
	});
	
});