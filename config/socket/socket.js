var Game = require('./game');
var Player = require('./player');

module.exports = function(io){

  var _allGames = {};
  var _count = 1;

  io.sockets.on('connection', function(socket) {
    console.log('SOCKET WORKING');
    socket.emit('message', { message: 'Welcome to PhoneTag' });

    socket.on('createGame', function(data){
      console.log('Creating Game');
      var roomID = _count++;
      var game = new Game(roomID);
      var player = new Player(socket, data.user, roomID);
      game.addPlayer(player);
      _allGames[roomID] = game;
      socket.join(roomID);
    });

    socket.on('joinGame', function(data){
      console.log('Join game clicked!');
      var player = new Player(socket, data.user, data.roomID);
      var game = new Game(data.roomID);
      _allGames[data.roomID] = game;
      game.addPlayer(player);
      socket.join(data.roomID);
      socket.emit('playerAdded', game.players);
    });

    socket.on('startGame', function(){
      console.log('Game starting!');
      this.emit('gameStarting');
    });

    socket.on('newPlayerAdded', function(data){
      console.log('New player added!');
      var game = _allGames[data.roomID];
      var player = game.getPlayer(data.name);
      player.location = (data.location);
      this.emit('createMarker', data);
    });

    socket.on('sendLocationFromPlayer', function(data){
      var game = _allGames[data.roomID];
      var player = game.getPlayer(data.name);
      player.location = (data.location);
      var newLocations = game.updateLocations();
      socket.emit('sendLocationsToPlayer', newLocations);
    });

    socket.on('tapPlayer', function(data){
      console.log('Tapped Player, YAY!');
      player = data.player;
      id = data.socketId;
      Players.find();
      socket(id).emit('dead', { message: 'you are dead' });
    });

    socket.on('tapPlayer', function(data){
      console.log('Tapped Player, YAY!');
    });

  });

};
