require.config({
  paths: {
    backbone: 'lib/backbone/backbone-min',
    handlebars: 'lib/handlebars/handlebars.min',
    zepto: 'lib/zepto/zepto.min',
    underscore: 'lib/lodash/dist/lodash.min',
    text : 'lib/requirejs-text/text'
  },
  shim: {
    'backbone': {
      deps: ['underscore', 'zepto'],
      exports: 'Backbone'
    },
    'handlebars': {
      exports: 'Handlebars'
    },
    'zepto': {
      exports: '$'
    }
  }
});

require(['zepto', 'backbone'], function($, Backbone){
  $(document).ready(function(){
    if (window.location.hash && window.location.hash == '#_=_') {
      if (window.history && history.pushState) {
        window.history.pushState('', document.title, window.location.pathname);
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

  require(['models/app', 'views/AppView'], function(App, AppView){
    new AppView({model: new App()});
  });
});
