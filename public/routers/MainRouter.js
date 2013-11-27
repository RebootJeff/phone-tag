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

    routeOptions: {reverse: false, changeHash: false},

    swapView: function(view){
      this.$el.append(view.render().el);
    },

    login: function(){
      $.mobile.changePage("#login", this.routeOptions);
    },

    home: function(){
      if(!$('#home').length){
        var homeView = new HomeView();
        this.swapView(homeView);
      }
      $.mobile.changePage("#home", this.routeOptions);
    },

    leaderboard: function(){
      $.mobile.changePage("#leaderboard", this.routeOptions);
    },

    game: function(){
      if(!$('#game').length){
        var gameView = new GameView();
        this.swapView(gameView);
        new Map();
      }
      $.mobile.changePage("#game", this.routeOptions);
    },

    inventory: function(){
      $.mobile.changePage("#inventory", this.routeOptions);
    }
  });

  return Router;
});
