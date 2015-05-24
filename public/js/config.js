require.config({
	waitSeconds: 45,
	paths: {
		'loader'				: 'common/loader',
		'facade'				: 'common/facade',
		'mediator'			: 'common/mediator',
    'appstate'      : 'common/appState',

		'backbone' 			: 'vendor/backbone/backbone',
		'jquery'				: 'vendor/jquery/jquery',
		'jquery-private': 'vendor/jquery/jquery.private',
    'modal'         : 'vendor/bootstrap/modal',
		'requirejs'			: 'vendor/requirejs/require',
		'hbs'						: 'vendor/require-handlebars-plugin/hbs1',
		'handlebars'		: 'vendor/require-handlebars-plugin/Handlebars',
		'text'					: 'vendor/requirejs-text/text',
    'order'         : 'vendor/requirejs-order/order',
		'i18n'					: 'vendor/requirejs-i18n/i18n',
    'i18nprecompile': 'vendor/require-handlebars-plugin/i18nprecompile',
    'json2'					: 'vendor/json2/json2',
    'underscore'		: 'vendor/underscore/underscore',
    'flexslider'    : 'vendor/flexslider2/jquery.flexslider'
	},
	map: {
    // '*' means all modules will get 'jquery-private'
    // for their 'jquery' dependency.
    '*': { 'jquery': 'jquery-private' },

    // 'jquery-private' wants the real jQuery module though.
    'jquery-private': { 'jquery': 'jquery' }
  },
	shim: {
		underscore: {
    	exports: '_'
    },
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    flexslider: {
      deps: ['jquery'],
      exports: 'jQuery.fn.flexslider'
    },
		json2: {
			exports: 'JSON'
		},
    modal: {
      deps: ['jquery']
    }
  },
  hbs: {
    disableI18n: true,
    templateExtension: 'html',
    helperPathCallback: function (name) {
        return 'lib/handlebars/helpers/' + name;
    }
  }
});

// startup the facade and its component loader
require(['facade', 'loader'], function (facade) {
  console.log('loader started!');
	facade.publish('loader:refresh');
});