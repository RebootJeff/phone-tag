define(['backbone'], function(Backbone){
  var App = Backbone.Model.extend({
    initialize: function(){
      var that = this;
      this.on('setUser', this.setUser, this);
      this.socket = io.connect('http://hadooken.herokuapp.com');
      this.socket.on('renderGameViews', function(){
        that.trigger('renderGameViews');
      });
    },

    setUser: function(){
      this.set('user', $('input').val());
      this.trigger('loggedIn');
    }
  });
  return App;
});
