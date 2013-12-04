define(['backbone', 'routers/MainRouter'], function(Backbone, Router){
  var AppView = Backbone.View.extend({

    el: $('body'),

    initialize: function(){
      this.router = new Router({app: this.model});
      // this.router.on('route', function(){console.log(this.model.get('user'));}, this);
      this.model.on('loggedIn', this.renderHomeView, this);
      this.model.on('renderGameViews', this.renderGameView, this);
      Backbone.history.start({pushState: true});
    },

    events: {
      'submit': 'login',
      'click a.logout': 'logout',
      'click a.home':  'renderHomeView',
      'click a.leaderboard': 'renderLeaderboardView',
      'click a.join': 'renderJoinView',
      'click a.game': 'renderGameView',
      'click button.start': 'sendStartGame',
      'click a.inventory': 'renderInventoryView',
      'click button.tag': 'tag',
      'click #inventory li': 'inventory',
      'click a.quit': 'quitGame',
      'renderGameViews': 'renderGameView'
    },

    login: function(e){
      e && e.preventDefault();
      // Todo send it to the server
      this.model.trigger('setUser');
    },

    logout: function(){
      // var that = this;
      // $.get('/logout', function(){
      //   that.model.set('user', null);
      //   that.router.navigate('/', {trigger:true});
      // });
      this.router.navigate('/', {trigger:true});
    },

    sendStartGame: function(e){
      e && e.preventDefault();
      this.model.socket.emit('startGame', this.model.get('game').get('gameID'));
    },

    quitGame: function(e){
      e && e.preventDefault();
      var gameID = this.model.get('game').get('gameID');
      var username = this.model.get('user');
      var obj = { gameID: gameID, username: username };
      this.model.socket.emit('leaveGame', obj);
      this.router.navigate('/', {trigger:true});
    },

    renderHomeView: function(e){
      e && e.preventDefault();
      this.router.navigate('/home', {trigger:true});
    },

    renderJoinView: function(e){
      e && e.preventDefault();
      this.router.navigate('/join', {trigger:true});
    },

    renderLeaderboardView: function(e){
      e && e.preventDefault();
      this.router.navigate('/leaderboard', {trigger:true});
    },

    renderGameView: function(e){
      e && e.preventDefault();
      this.router.navigate('/game', {trigger:true});
    },

    renderInventoryView: function(e){
      e && e.preventDefault();
      this.router.navigate('/inventory', {trigger:true});
    },

    // checkAuth: function(){
    //   if(!this.model.get('user')){
    //     this.model.trigger('createPlayer');
    //   }
    // },

    tag: function(e){
      e && e.preventDefault();
      console.log('Tag clicked');
    },

    inventory: function(e){
      e && e.preventDefault();
      console.log('Inventory is clicked:', e.currentTarget);
    }

  });
  return AppView;
});
