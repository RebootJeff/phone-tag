define([ "jquery", "backbone", "../views/GameView", "../views/HomeView", "../views/InventoryView", "../views/LeaderboardView", "../views/LoginView", "../models/map"], function($, Backbone, GameView, HomeView, InventoryView, LeaderboardView, LoginView, Map){
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
      this.$el.html(view.render().el);
    },

    login: function(){
      var loginView = new LoginView();
      this.swapView(loginView);
    },

    home: function(){
        var homeView = new HomeView();
        this.swapView(homeView);
    },

    leaderboard: function(){
      var leaderboardView = new LeaderboardView();
      this.swapView(leaderboardView);
    },

    game: function(){
      var gameView = new GameView();
      this.swapView(gameView);
      new Map();
    },

    inventory: function(){
      var inventoryView = new InventoryView();
      this.swapView(inventoryView);
    }
  });

  return Router;
});
