define(['backbone', './currentPlayer','../collections/otherPlayers'], function(Backbone, CurrentPlayer, OtherPlayers){
  var Game = Backbone.Model.extend({
    initialize: function(options){
      // Create players
      this.set('gameID', 1);
      var currentPlayer = new CurrentPlayer({name: options.currentPlayer, roomID: this.get('gameID'), socket:this.socket});
      this.set('currentPlayer', currentPlayer);
      this.set('otherPlayers', new OtherPlayers());

      // Map setup
      this.mapSetup();

      // Socket setup
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

    mapSetup: function(){
      this.on('tag', this.tagPlayers, this);
      this.on('centerMap', this.centerMap, this);
      this.on('zoomOut', this.zoomOut, this);
      this.on('zoomIn', this.zoomIn, this);
    },

    updateLocations: function(data){
      var players = this.get('otherPlayers').models;
      for (var i = 0; i < players.length; i++) {
        players[i].set('location', data[players[i].get('name')]);
      }
    },

    centerMap: function(){
      this.get('map').centerMap();
    },

    tagPlayers: function(){
      this.get('map').checkPlayersToTag();
    },

    zoomOut: function(){
      this.get('map').zoomOut();
    },

    zoomIn: function(){
      this.get('map').zoomIn();
    }

  });
  return Game;
});
