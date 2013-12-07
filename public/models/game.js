define(['backbone', './currentPlayer','../collections/otherPlayers'], function(Backbone, CurrentPlayer, OtherPlayers){
  var Game = Backbone.Model.extend({
    initialize: function(options){
      // Create players
      // this.set('gameID', 1);
      // var currentPlayer = new CurrentPlayer({name: options.currentPlayer, gameID: this.get('gameID'), socket:this.socket});
      var currentPlayer = new CurrentPlayer({name: options.playerName, socket:this.socket});
      this.set('currentPlayer', currentPlayer);
      this.set('otherPlayers', new OtherPlayers());

      // Map setup
      this.mapSetup();

      // Socket setup
      this.socket = options.socket;
      this.socketSetup();
    },

    addPlayers: function(playersList){
      var players = [];
      for(var player in playersList){
        players.push(playersList[player]);
      }
      this.get('otherPlayers').reset(players);
      this.trigger('joinRender', this);
    },

    endGame: function(){
      var that = this;
      this.socket.emit('gameover', {gameID:that.get('gameID')});
    },

    socketSetup: function(){
      var that = this;
      var user = this.get('currentPlayer');

      // Socket connection and listeners
      // this.socket.emit('joinGame', {user: user.get('name'), gameID: user.get('gameID')});
      this.socket.emit('joinGame', {user: user.get('name')});
      this.socket.on('playerAdded', function(data){
        that.addPlayers(data);
      });
      this.socket.on('startGame', function(data){
        var player = that.get('currentPlayer');
        that.startTime = player.startTime;
        that.endTime = player.endTime = data[player.get('name')];
        that.trigger('startGame');
      });
      this.socket.on('renderScores', function(data){
        that.trigger('renderScores', data);
      });
      this.socket.on('sendPowerUp', function(data){
        that.addPowerUp(data);
      });
      this.socket.on('powerUpExpired', function(data){
        that.powerUpExpired(data);
      })
      this.socket.on('playerDead', function(data){
        that.setPlayerDead(data);
      });
      this.socket.on('playerAlive', function(data){
        that.setPlayerAlive(data);
      });
      // this.socket.on('sendLocationsToPlayer', function(data){
      //   that.updateLocations(data);
      // });
    },

    mapSetup: function(){
      this.on('tag', this.tagPlayers, this);
      this.on('centerMap', this.centerMap, this);
      this.on('zoomOut', this.zoomOut, this);
      this.on('zoomIn', this.zoomIn, this);
      // this.on('powerUp', this.powerUp, this);
    },

    centerMap: function(){
      this.get('map').centerMap();
    },

    tagPlayers: function(){
      this.get('map').checkPlayersToTag();
      this.get('map').tagAnimate();
    },


    zoomOut: function(){
      this.get('map').zoomOut();
    },

    zoomIn: function(){
      this.get('map').zoomIn();
    },

    addPowerUp: function(data){
      this.get('map').addPowerUpToMap(data);
    },

    powerUpExpired: function(data){
      this.get('map').powerUpExpired(data);
    }

    setPlayerDead: function(player, respawn){
      var currentPlayer = this.get('currentPlayer');
      if (player.name === currentPlayer.get('name')){
        currentPlayer.set('isAlive', false);
        this.get('map').addPowerUpToMap(respawn);
      }
      var deadPlayer = this.get('otherPlayers').find(function(model){
        return model.get('name') === player.name;
      });
      deadPlayer.set('isAlive', false);
      this.get('map').setPlayerDead(player.name);
    }
    // updateLocations: function(data){
    //   var players = this.get('otherPlayers').models;
    //   for (var i = 0; i < players.length; i++) {
    //     players[i].set('location', data[players[i].get('name')]);
    //   }
    // }

  });
  return Game;
});
