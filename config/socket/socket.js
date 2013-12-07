var Game = require('./game');
var Player = require('./player');

module.exports = function(io){

  var _allGames = {};
  var _id = 1;

  var _maxPlayers = 1;

  io.sockets.on('connection', function(socket) {
    socket.on('joinGame', function(data){
      var game, player;
      if (_allGames[_id] && _allGames[_id].playerCount < _maxPlayers) {
        game = _allGames[_id];
      } else {
        game = new Game(_id);
        _allGames[_id] = game;
      }
      player = new Player(socket, data.user, _id);
      game.addPlayer(player);
      this.join(_id);
      io.sockets.in(_id).emit('playerAdded', game.players);
      if (game.playerCount >= _maxPlayers){
        io.sockets.in(_id).emit('renderGameViews', {gameID:_id, timeLimit:game.timeLimit});
        _id++;
      }
    });


    socket.on('newPlayerMarker', function(data){
      var game = _allGames[data.gameID];
      var player = game.getPlayer(data.playerName);
      player.location = data.location;
      player.syncTime = Date.now();
      player.startTime = data.time;
      io.sockets.in(data.gameID).emit('createMarker', data);
      game.playersReady++;
      if (game.playersReady === _maxPlayers){
        var timers = game.startGame();
        sendLocations(data.gameID);
        io.sockets.in(data.gameID).emit('startGame', timers);
      }
    });

    socket.on('sendLocationFromPlayer', function(data){
      var game = _allGames[data.gameID];
      var player = game.getPlayer(data.playerName);
      player.location = data.location;
      // if( game ){
      //   var player = game.getPlayer(data.playerName);
      //   if( player ){
      //     player.location = data.location;
      //   }
      // }
    });

    socket.on('tagPlayers', function(data){
      var player, playerKilled, respawn;
      var game = _allGames[data.gameID];
      var taggedPlayers = data.taggedPlayers;
      var tagger = game.getPlayer(data.taggerName);

      for(var i = 0; i < taggedPlayers.length; i++){
        player = game.getPlayer(taggedPlayers[i].playerName);
        if(player.isAlive){
          player.isAlive = false;
          player.deaths++;
          tagger.kills++;
          playerKilled = {name: player.name, gameID: gameID};
          respawn = game.generateRespawn(player);
          io.sockets.in(data.gameID).emit('playerDead', playerKilled, respawn);
        }
      }
    });

    // socket.on('generateRespawn', function(data){
    //   var game = _allGames[data.gameID];
    //   var respawn = game.generateRespawn(data.playerName);
    //   socket.emit('sendRespawn', respawn);
    // });

    socket.on('playerRespawn', function(data){
      var game = _allGames[data.gameID];
      var player = game.players[data.playerName];

      if(!player.isAlive){
        player.isAlive = true;
      }

      io.sockets.in(data.gameID).emit('playerRevived', data.playerName);
    });


    socket.on('addItemToPlayer', function(data){
      var game = _allGames[data.gameID];
      var player = game.getPlayer(data.playerName);
      player.addPowerUp(data.item);
      io.sockets.in(data.gameID).emit('removePowerUp', {powerUpID:data.powerUpID});
    });

    // data = { gameID: gameID, playerName: playerName };
    socket.on('leaveGame', function(data){
      console.log("Quit", data);
      // remove player from game
      var game = _allGames[data.gameID];
      var newLocations = game.removePlayer(data.playerName).updateLocations();
      // notify all other players
      socket.leave(data.gameID);
      var quitter = { name: data.playerName, newLocations: newLocations };
      socket.broadcast.to(data.gameID).emit('someoneLeft', quitter);
    });

    socket.on('gameover', function(data){
      var game = _allGames[data.gameID];
      io.sockets.in(data.gameID).emit('renderScores', game.players);
    });

    // socket.on('generatePowerUp', function(data){
    //   var game = _allGames[data.gameID];
    //   if( !game.powerUp.name ){
    //     var powerUpCollection = ["poop"];
    //     var randomIndex = Math.floor(Math.random() * powerUpCollection.length);
    //     game.generatePowerUp(powerUpCollection[randomIndex], data.location.lat, data.location.lng);
    //     io.sockets.in(data.gameID).emit('addPowerUpToMap', game.powerUp);
    //   }
    // });

    // socket.on('createGame', function(data){
    //   console.log('Creating Game');
    //   var gameID = _id++;
    //   var game = new Game(gameID);
    //   var player = new Player(socket, data.user, gameID);
    //   game.addPlayer(player);
    //   _allGames;
    // });

    // socket.on('startGame', function(gameID){
    //   var game = _allGames[gameID];
    //   if (Object.keys(game.players).length === _maxPlayers) {
    //     io.sockets.in(gameID).emit('renderGameViews');
    //   }
    // });

    var sendLocations = function(gameID){
      var game = _allGames[gameID];
      var newLocations;
      setInterval(function(){
        newLocations = game.updateLocations();
        io.sockets.in(gameID).emit('sendLocationsToPlayer', newLocations);
      }, 2000);
    };


  });

};

