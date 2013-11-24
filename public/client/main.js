require.config({
  paths: {
    backbone: '../lib/backbone/backbone',
    handlebars: '../lib/handlebars/handlebars',
    jquery: '../lib/jquery/jquery',
    jqueryMobile: '../lib/jquery-mobile-bower/js/jquery.mobile-1.3.2',
    underscore: '../lib/underscore/underscore'
  },
  shim: {
    'backbone': {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    'handlebars': {
      exports: 'Handlebars'
    }
  }
});

require(['models/app'], function(App){
  new App();
});
