define([ "jquery", "backbone", "../models/app"], function($, Backbone, App){
  var Router = Backbone.Router.extend({
    initialize: function(){
      new App();
      Backbone.history.start();
    },

    routes: {
      "": "home",
      "about": "about"
    },

    home: function(){
      console.log("home is getting called");
      $.mobile.changePage("#home" , {reverse: false, changeHash: false});
    },

    about: function(){
      console.log("about is getting called");
      $.mobile.changePage("#about" , {reverse: false, changeHash: false});
    }
  });
  return Router;

});
