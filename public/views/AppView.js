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

      // Game events
      // 'click button.start': 'sendStartGame',
      'click #inventory li': 'powerUpInventory',
      'click button.tag': 'tag',
      'click button.powerUp': 'powerUp',
      'click button.inventory': 'renderInventoryView',
      'click button.quit': 'quitGame',
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
      this.router.navigate('/', {trigger:true});
      // var that = this;
      // $.get('/logout', function(){
      //   that.model.set('user', null);
      //   that.router.navigate('/', {trigger:true});
      // });
    },

    // checkAuth: function(){
    //   if(!this.model.get('user')){
    //     this.model.trigger('createPlayer');
    //   }
    // },

    quitGame: function(e){
      e && e.preventDefault();
      var gameID = this.model.get('currentGame').get('gameID');
      var username = this.model.get('user');
      var obj = { gameID: gameID, username: username };
      this.model.socket.emit('leaveGame', obj);
      this.router.navigate('/', {trigger:true});
    },

    renderHomeView: function(e){
      e && e.preventDefault();
      this.router.navigate('/home', {trigger:true});
    },

    renderLeaderboardView: function(e){
      e && e.preventDefault();
      this.router.navigate('/leaderboard', {trigger:true});
    },

    renderJoinView: function(e){
      e && e.preventDefault();
      this.router.navigate('/join', {trigger:true});
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

    // Game functions
    // sendStartGame: function(e){
    //   e && e.preventDefault();
    //   this.model.socket.emit('startGame', this.model.get('currentGame').get('gameID'));
    // },

    tag: function(e){
      e && e.preventDefault();
      this.model.get('currentGame').trigger('tag');
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
      $('.modal').toggleClass('closed');
    },

    zoomOut: function(e){
      e && e.preventDefault();
      this.model.get('currentGame').trigger('zoomOut');
    },

    zoomIn: function(e){
      e && e.preventDefault();
      this.model.get('currentGame').trigger('zoomIn');
    },

    powerUp: function(e){
      e && e.preventDefault();
      console.log('Pick Up clicked');
      this.model.get('currentGame').trigger('powerUp');
    },

    centerMap: function(e){
      e && e.preventDefault();
      this.model.get('currentGame').trigger('centerMap');
    }

  });
  return AppView;
});
