define(['backbone', './player'], function(Backbone, Player){
  var App = Backbone.Model.extend({
    initialize: function(){
      this.on('createPlayer', this.createPlayer, this);
    },

    createPlayer: function(){
      this.set('username', $('input').val());
      this.set('user', new Player());
      // var that = this;
      // this.set('user', new Player());
      // this.get('user').fetch({
      //   success: function(){
      //     that.trigger('loggedIn');
      //   }
      // });

      // Todo: Send player info to socket (server)
      this.trigger('loggedIn');
    }
  });
  return App;
});
