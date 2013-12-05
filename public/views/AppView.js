define(['backbone', 'routers/MainRouter'], function(Backbone, Router){
  var AppView = Backbone.View.extend({

    el: $('body'),

    initialize: function(){
      this.router = new Router({app: this.model});
      // this.router.on('route', function(){console.log(this.model.get('user'));}, this);
      this.model.on('loggedIn', this.renderHomeView, this);
      this.model.on('renderGameViews', this.renderGameView, this);
      Backbone.history.start({pushState: false});
    },

    events: {
      // Login events
      'submit': 'login',
      'click a.logout': 'logout',

      // View render events
      'click a.home':  'renderHomeView',
      'click a.leaderboard': 'renderLeaderboardView',
      'click a.join': 'renderJoinView',
      'click a.game': 'renderGameView',
      'click a.quit': 'renderQuitView',
      'click a.inventory': 'renderInventoryView',
      'renderGameViews': 'renderGameView',

      // Game events
      'click button.start': 'sendStartGame',
      'click button.tag': 'tag',
      'click button.powerUp': 'powerUp',
      'click a.quit': 'quitGame',
      'renderGameViews': 'renderGameView',
      'click #inventory li': 'powerUpInventory',

      // Map control events
      'click button.zoomOut': 'zoomOut',
      'click button.zoomIn': 'zoomIn',
      'click button.toggleModal': 'toggleModal',
      'click button.centerMap': 'centerMap'
    },

    // Login/Logout functions
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

    // checkAuth: function(){
    //   if(!this.model.get('user')){
    //     this.model.trigger('createPlayer');
    //   }
    // },

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

    // Game functions
    sendStartGame: function(e){
      e && e.preventDefault();
      this.model.socket.emit('startGame', this.model.get('game').get('gameID'));
    },

    tag: function(e){
      e && e.preventDefault();
      this.model.get('game').trigger('tag');
      this.tagCountdown();
    },

    tagCountdown: function(){
      $('button.tag').prop('disabled',true);
      setTimeout(function(){
        clearInterval(timer);
        $('button.tag').html('Tag');
        $('button.tag').prop('disabled',false);
      }, 15000);
      var count = 15;
      var timer = setInterval(function(){
        count--;
        $('button.tag').html(count);
      }, 1000);
    },

    powerUpInventory: function(e){
      e && e.preventDefault();
      console.log('PowerUp Inventory is clicked:', e.currentTarget);
    },

    // Map functions
    toggleModal: function(e){
      e && e.preventDefault();
      console.log('modalToggled');
      $('.modal').toggleClass('hidden closed');
    },

    zoomOut: function(e){
      e && e.preventDefault();
      this.model.get('game').trigger('zoomOut');
    },

    zoomIn: function(e){
      e && e.preventDefault();
      this.model.get('game').trigger('zoomIn');
    },

    powerUp: function(e){
      e && e.preventDefault();
      console.log('Pick Up clicked');
      this.model.get('game').trigger('powerUp');
    },

    centerMap: function(e){
      e && e.preventDefault();
      this.model.get('game').trigger('centerMap');
    }

  });
  return AppView;
});
