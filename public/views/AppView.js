define(['backbone', 'routers/MainRouter'], function(Backbone, Router){
  var AppView = Backbone.View.extend({

    el: $('body'),

    initialize: function(){
      this.router = new Router({el: this.$el.find('#container')});
      this.router.on('route', function(){console.log(this.model.get('username'));}, this);
      this.model.on('loggedIn', this.renderHomeView, this);
      Backbone.history.start({pushState: true});
    },

    events: {
      'submit': 'login',
      'click a.logout': 'logout',
      'click a.home':  'renderHomeView',
      'click a.leaderboard': 'renderLeaderboardView',
      'click a.game': 'renderGameView',
      'click a.inventory': 'renderInventoryView',
      'click button.tag': 'tag',
      'click #inventory li': 'inventory'
    },

    login: function(e){
      e && e.preventDefault();
      // Todo send it to the server
      this.model.trigger('createPlayer');
    },

    logout: function(){
      // var that = this;
      // $.get('/logout', function(){
      //   that.model.set('user', null);
      //   that.router.navigate('/', {trigger:true});
      // });
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
