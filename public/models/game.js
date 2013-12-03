define(['backbone', './currentPlayer','../collections/otherPlayers'], function(Backbone, CurrentPlayer, OtherPlayers){
  var Game = Backbone.Model.extend({
    initialize: function(options){
      // Create players
      this.set('gameID', 1);
      var currentPlayer = new CurrentPlayer({name: options.currentPlayer, roomID: this.get('gameID'), socket:this.socket});
      this.set('currentPlayer', currentPlayer);
      this.set('otherPlayers', new OtherPlayers());
      this.socket = options.socket;
      this.socketSetup();
    },

    addPlayers: function(playersList){
      console.log("playersAdded emitted");
      var players = [];
      for(var player in playersList){
        players.push(playersList[player]);
      }
      this.get('otherPlayers').reset(players);
      this.trigger('joinRender', this);
    },

    socketSetup: function(){
      var that = this;
      var user = this.get('currentPlayer');

      // Socket connection and listeners
      this.socket.emit('joinGame', {user: user.get('name'), roomID: user.get('roomID')});
      this.socket.on('playerAdded', function(data){that.addPlayers(data);});
      this.socket.on('sendLocationsToPlayer', function(data){that.updateLocations(data);});
    },

    updateLocations: function(data){
      var players = this.get('otherPlayers').models;
      for (var i = 0; i < players.length; i++) {
        players[i].set('location', data[players[i].get('name')]);
        // calculate distance between user and this
      }
    }

    // distanceFromUser: function(){
    //   rad = function(x) {return x*Math.PI/180;};

    //   distHaversine = function(p1, p2) {
    //     var R = 6371; // earth's mean radius in km
    //     var dLat  = rad(p2.lat() - p1.lat());
    //     var dLong = rad(p2.lng() - p1.lng());

    //     var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    //             Math.cos(rad(p1.lat())) * Math.cos(rad(p2.lat())) * Math.sin(dLong/2) * Math.sin(dLong/2);
    //     var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    //     var d = R * c;

    //     return d.toFixed(3);
    //   };
    // }
  });
  return Game;
});
