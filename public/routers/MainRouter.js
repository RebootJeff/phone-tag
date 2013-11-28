define([ "jquery", "backbone", "../views/GameView", "../views/HomeView", "../views/LoginView", "../models/map"], function($, Backbone, GameView, HomeView, LoginView, Map){
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
      if($('#home').length === 0){
        var homeView = new HomeView();
        this.swapView(homeView);
      }else{
        this.slidePageFrom($('#leaderboard'), $('#home'), 'left');
      }
    },

    leaderboard: function(){
      this.slidePageFrom($('#home'), $('#leaderboard'), 'right');
    },

    game: function(){
      if($('#game').length === 0){
        var gameView = new GameView();
        this.swapView(gameView);
        new Map();
      }else{
        this.slidePageFrom($('#inventory'), $('#game'), 'left');
      }
    },

    inventory: function(){
      this.slidePageFrom($('#game'), $('#inventory'), 'right');
    },

    slidePageFrom: function(start, end, slideDirection) {
      end.removeClass().addClass('page transition center');
      var startClass = (slideDirection === 'left') ? 'right' : 'left';
      start.removeClass().addClass('page transition ' + startClass);
    }
  });

  return Router;
});
