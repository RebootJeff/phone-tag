require.config({
  paths: {
    jquery: '../lib/jquery/jquery',
    underscore: '../lib/underscore/underscore',
    backbone: '../lib/backbone/backbone'
  },
  shim: {
    'backbone': {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    }
  }
});

require(['models/app'], function(App){
  new App();
});
