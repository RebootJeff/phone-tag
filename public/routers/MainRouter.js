define([ "jquery", "backbone", "../views/GameView", "../views/HomeView", "../models/map"], function($, Backbone, GameView, HomeView, Map){
  var Router = Backbone.Router.extend({
    initialize: function(options){
      this.$el = options.el;
    },

    routes: {
      "": "login",
      "home": "home",
      "leaderboard": "leaderboard",
      "game": "game",
      "inventory": "inventory"
    },

    swapView: function(view){
      this.$el.append(view.render().el);
    },

    login: function(){
      $.mobile.changePage("#login" , {reverse: false, changeHash: false});
    },

    home: function(){
      if(!$('#home').length){
        var homeView = new HomeView();
        this.swapView(homeView);
      }
      $.mobile.changePage("#home" , {reverse: false, changeHash: false});
    },

    leaderboard: function(){
      $.mobile.changePage("#leaderboard" , {reverse: false, changeHash: false});
    },

    game: function(){
      if(!$('#game').length){
        var gameView = new GameView();
        this.swapView(gameView);
        new Map();
      }
      $.mobile.changePage("#game" , {reverse: false, changeHash: false});
    },

    inventory: function(){
      $.mobile.changePage("#inventory", {reverse: false, changeHash: false});
    }

  });

  return Router;
});
