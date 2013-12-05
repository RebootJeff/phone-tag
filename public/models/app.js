define(['backbone'], function(Backbone){
  var App = Backbone.Model.extend({
    initialize: function(){
      var that = this;
      this.on('setUser', this.setUser, this);
      this.socket = io.connect();
      this.socket.on('renderGameViews', function(data){
        that.set('currentGameRoomID', data.roomID);
        var currentGame = that.get('currentGame');
        var currentPlayer = currentGame.get('currentPlayer');
        currentGame.set('timeLimit', data.timeLimit);
        currentGame.set('roomID', data.roomID);
        currentPlayer.set('roomID', data.roomID);
        setTimeout(function(){
          that.trigger('renderGameViews');
        }, 5000);
      });
    },

    setUser: function(){
      this.set('user', $('input').val());
      this.trigger('loggedIn');
    }
  });
  return App;
});
