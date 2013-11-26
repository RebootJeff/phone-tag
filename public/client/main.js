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

require(["jquery", "backbone", "models/app"], function($, Backbone, App){
  $(document).ready(function(){
    if (window.location.hash && window.location.hash == '#_=_') {
      if (window.history && history.pushState) {
        window.history.pushState("", document.title, window.location.pathname);
      }else{
        // Prevent scrolling by storing the page's current scroll offset
        var scroll = {
          top: document.body.scrollTop,
          left: document.body.scrollLeft
        };
        window.location.hash = '';
        // Restore the scroll offset, should be flicker free
        document.body.scrollTop = scroll.top;
        document.body.scrollLeft = scroll.left;
      }
    }
  });

  require(["jqueryMobile"], function(){
    new App();
  });

  $(document).bind("mobileinit", function(){
    // Prevents all anchor click handling including the addition of active button state and alternate link bluring.
    $.mobile.ajaxEnabled = false;
    // Disabling this will prevent jQuery Mobile from handling hash changes
    $.mobile.hashListeningEnabled = false;
  });

});
