var Game = require('./game');
var Player = require('./player');

module.exports = function(io){

  var _allGames = {};
  var _count = 1;

  var _maxPlayers = 2;

  io.sockets.on('connection', function(socket) {
    // socket.on('createGame', function(data){
    //   console.log('Creating Game');
    //   var roomID = _count++;
    //   var game = new Game(roomID);
    //   var player = new Player(socket, data.user, roomID);
    //   game.addPlayer(player);
    //   _allGames;
    socket.on('joinGame', function(data){
      console.log('Join game clicked!');
      var game;
      var player = new Player(socket, data.user, data.roomID);
      if(!_allGames[data.roomID]){
        game = new Game(data.roomID);
        _allGames[data.roomID] = game;
      }else{
        game = _allGames[data.roomID];
      }
      game.addPlayer(player);
      this.join(data.roomID);
      io.sockets.in(data.roomID).emit('playerAdded', game.players);
    });

    socket.on('startGame', function(gameID){
      console.log('Game starting!');
      var game = _allGames[gameID];
      if (Object.keys(game.players).length === _maxPlayers) {
        io.sockets.in(gameID).emit('renderGameViews');
      }
    });

    socket.on('newPlayerMarker', function(data){
      console.log('New player marker added!');
      var game = _allGames[data.roomID];
      var player = game.getPlayer(data.name);
      player.location = (data.location);
      io.sockets.in(data.roomID).emit('createMarker', data);
      if (Object.keys(game.players).length === _maxPlayers){
        sendLocations(data.roomID);
      }
    });

    socket.on('sendLocationFromPlayer', function(data){
      var game = _allGames[data.roomID];
      var player = game.getPlayer(data.name);
      if( player ){
        player.location = data.location;
      }
    });

    socket.on('tagPlayers', function(response){
      console.log('Players tagged, YAY!');
      var gameID = response.roomID,
          game = _allGames[gameID],
          taggedPlayers = response.taggedPlayers,
          tagger = game.getPlayer(response.tagger),
          player;

      for(var i = 0; i < taggedPlayers.length; i++){
        player = game.getPlayer(taggedPlayers[i].player);
        if(player.isAlive){
          player.isAlive = false;
          player.deaths++;
          tagger.kills++;
          playerKilled = {name: player.name, roomID: gameID};
          setTimeout(function(){
            player.isAlive = true;
            io.sockets.in(gameID).emit('playerAlive', playerKilled);
          }, 10000);
          io.sockets.in(gameID).emit('playerDead', playerKilled);
        }
      }
    });

    // data = { gameID: gameID, username: username };
    socket.on('leaveGame', function(data){
      console.log("Quit", data);
      // remove player from game
      var game = _allGames[data.gameID];
      var newLocations = game.removePlayer(data.username).updateLocations();
      // notify all other players
      socket.leave(data.gameID);
      var obj = { username: data.username, newLocations: newLocations };
      socket.broadcast.to(data.gameID).emit('someoneLeft', obj);
    });

    var sendLocations = function(gameID){
      var game = _allGames[gameID];
      var newLocations;
      setInterval(function(){
        newLocations = game.updateLocations();
        console.log("sending locations to clients");
        console.log("location data:", newLocations);
        console.log(new Date());
        io.sockets.in(gameID).emit('sendLocationsToPlayer', newLocations);
      }, 2000);
    };
  });

};
