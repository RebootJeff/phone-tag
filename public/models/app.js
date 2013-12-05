define(['backbone'], function(Backbone){
  var App = Backbone.Model.extend({
    initialize: function(){
      var that = this;
      this.socket = io.connect();
      // this.socket = io.connect('http://hadooken.herokuapp.com');
      this.on('setUser', this.setUser, this);
      this.socket.on('renderGameViews', that.renderGameViews);
    },

    setUser: function(){
      this.set('user', $('input').val());
      this.trigger('loggedIn');
    },

    renderGameViews: function(data){
      var that = this;
      this.set('currentGameRoomID', data.roomID);
      var currentGame = this.get('currentGame');
      var currentPlayer = currentGame.get('currentPlayer');
      currentGame.set('timeLimit', data.timeLimit);
      currentGame.set('roomID', data.roomID);
      currentPlayer.set('roomID', data.roomID);
      setTimeout(function(){
        that.trigger('renderGameViews');
      }, 5000);
    }
  });
  return App;
});
