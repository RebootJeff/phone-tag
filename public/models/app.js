define(['backbone'], function(Backbone){
  var App = Backbone.Model.extend({
    initialize: function(){
      this.on('setUser', this.setUser, this);
    },

    setUser: function(){
      this.set('user', $('input').val());
      this.trigger('loggedIn');
    }
  });
  return App;
});
