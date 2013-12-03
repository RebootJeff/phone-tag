define([ 'jquery', 'backbone', '../views/GameView', '../models/Game', '../views/HomeView', '../views/LoginView', '../views/JoinView', '../models/map'], function($, Backbone, GameView, Game, HomeView, LoginView, JoinView, Map){
  var Router = Backbone.Router.extend({
    initialize: function(options){
      this.app = options.app;
    },

    routes: {
      '': 'login',
      'home': 'home',
      'leaderboard': 'leaderboard',
      'join': 'join',
      'game': 'game',
      'inventory': 'inventory'
    },

    login: function(){
      new LoginView();
    },

    home: function(){
      if($('#home').length === 0){
        new HomeView();
      }else{
        this.slidePageFrom($('#leaderboard'), $('#home'), 'left');
      }
    },

    join: function(){
      this.app.set('game', new Game({currentPlayer: this.app.get('user')}));
      new JoinView({model: this.app.get('game'), user: this.app.get('user')});
    },

    leaderboard: function(){
      this.slidePageFrom($('#home'), $('#leaderboard'), 'right');
    },

    game: function(){
      if($('#game').length === 0){
        var that = this;
        this.app.get('game').socket.on('gameStarting', function(){
          new GameView({model: that.app.get('game'), socket: that.app.get('game').socket});
        });
        this.app.get('game').socket.emit('startGame');
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
