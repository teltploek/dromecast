define(['jquery'], function (jQuery) {
	var soundcompare;

	var SoundCompare = function () {

	};

	SoundCompare.prototype.init = function () {
		jQuery('body').css({ 'background-color' : 'salmon' });
	};

	soundcompare = new SoundCompare();

	return soundcompare;
});