var Game = require('./game');
var Player = require('./player');

module.exports = function(io){

  var _allGames = {};
  var _count = 1;

  var _maxPlayers = 1;

  io.sockets.on('connection', function(socket) {
    // socket.on('createGame', function(data){
    //   console.log('Creating Game');
    //   var roomID = _count++;
    //   var game = new Game(roomID);
    //   var player = new Player(socket, data.user, roomID);
    //   game.addPlayer(player);
    //   _allGames;
    socket.on('joinGame', function(userData){
      var game, player;
      if (_allGames[_count] && _allGames[_count].playerCount < _maxPlayers) {
        game = _allGames[_count];
      } else {
        game = new Game(_count);
        _allGames[_count] = game;
      }
      player = new Player(socket, userData.user, _count);
      game.addPlayer(player);
      this.join(_count);
      io.sockets.in(_count).emit('playerAdded', game.players);
      if (game.playerCount >= _maxPlayers){
        io.sockets.in(_count).emit('renderGameViews', {roomID:_count, timeLimit:game.timeLimit});
        _count++;
      }
    });

    // socket.on('startGame', function(gameID){
    //   var game = _allGames[gameID];
    //   if (Object.keys(game.players).length === _maxPlayers) {
    //     io.sockets.in(gameID).emit('renderGameViews');
    //   }
    // });

    socket.on('newPlayerMarker', function(data){
      var game = _allGames[data.roomID];
      var player = game.getPlayer(data.name);
      player.location = data.location;
      player.syncTime = Date.now();
      player.startTime = data.time;
      io.sockets.in(data.roomID).emit('createMarker', data);
      game.playersReady++;
      if (game.playersReady === _maxPlayers){
        var timers = game.startGame();
        sendLocations(data.roomID);
        io.sockets.in(data.roomID).emit('startGame', timers);
      }
    });

    socket.on('sendLocationFromPlayer', function(data){
      var game = _allGames[data.roomID];
      var player = game.getPlayer(data.name);
      if( player ){
        player.location = data.location;
      }
    });

    socket.on('tapPlayer', function(data){
      player = data.player;
      id = data.socketId;
      Players.find();
      socket(id).emit('dead', { message: 'you are dead' });
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

    socket.on('gameover', function(data){
      var game = _allGames[data.roomID];
      io.sockets.in(data.roomID).emit('renderScores', game.players);
    });

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
