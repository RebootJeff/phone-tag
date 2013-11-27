define(['backbone', './player'], function(Backbone, Player){
  var App = Backbone.Model.extend({
    initialize: function(){
      this.on('createPlayer', this.createPlayer, this);
    },

    createPlayer: function(){
      var that = this;
      this.set('user', new Player());
      this.get('user').fetch({
        success: function(){
          that.trigger('loggedIn');
        }
      });
    }
  });
  return App;
});
