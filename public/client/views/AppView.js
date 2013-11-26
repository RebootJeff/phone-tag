define(['backbone', 'routers/MainRouter'], function(Backbone, Router){
  var AppView = Backbone.View.extend({

    el: $('body'),

    initialize: function(){
      this.router = new Router({el: this.$el.find('#container')});
      // this.router.on('route', this.updateNav, this);
      Backbone.history.start({pushState: true});
    },

    events: {
      "click a.home":  "renderHomeView",
      "click a.leaderboard": "renderLeaderboardView",
      "click a.game": "renderGameView",
      "click a.inventory": "renderInventoryView"
    },

    renderHomeView: function(e){
      e && e.preventDefault();
      this.router.navigate('/', {trigger:true});
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
    }
  });
  return AppView;
});
