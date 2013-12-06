var Player = require('./player');
var PowerUp = require('./powerup');

var Game = function(room) {

  this.timeLimit = 1;    //in minutes
  this.loadTime = 5;     //in seconds

  this.roomID = room;

  this.players = {};
  this.playerCount = 0;
  this.playersReady = 0;

  this.gameStarted = false;
  this.gameEnded = false;
  this.initTime = null;
  this.endTime = null;

  this.winners = [];
  this.mapLocation = [];
  this.powerUpList = ['invisible', 'invincible'];

};

Game.prototype.addPlayer = function(player){
  this.players[player.name] = player;
  this.playerCount++;
};

Game.prototype.removePlayer = function(playerName){
  delete this.players[playerName];
  this.playerCount--;
  return this;
};

Game.prototype.startGame = function(){
  var player;
  var playerTimers = {};
  var timeLimit = this.timeLimit * 60 * 1000;
  var loadTime = this.loadTime * 1000;
  var currentTime = Date.now();

  this.gameStarted = true;
  this.initTime = currentTime;
  this.startTime = this.initTime + loadTime;
  this.endTime = this.initTime + loadTime + timeLimit;

  for(var playerName in this.players) {
    player = this.players[playerName];
    playerTimers[player.name] = player.startTime + (currentTime - player.syncTime) + loadTime + timeLimit;
  }
  return playerTimers;

  this.generatePowerUps();
}

Game.prototype.endGame = function(){
  this.gameEnded = true;
};

Game.prototype.updateLocations = function(){
  var currentLocations = {};
  for(var playerName in this.players){
    currentLocations[playerName] = this.players[playerName].location;
  }
  return currentLocations;
};

Game.prototype.getRoomID = function(){
  return this.roomID;
};

Game.prototype.getPlayer = function(playerName) {
  return this.players[playerName];
};

Game.prototype.sendStats = function(data) {

};

Game.prototype.generateRespawn = function(playerName) {
  var latOffset, lngOffset, playerLat, playerLng, socket;
  var range = 0.0001;
  var tolerance = 1000;

  player = this.players[playerName];
  socket = player.socket;
  latOffset = (Math.random()*range) - (range / 2);
  lngOffset = (Math.random()*range) - (range / 2);
  playerLat = player.position.lat + latOffset;
  playerLng = player.position.lng + lngOffset;

  var respawn = new PowerUp({name:'respawn',location:{lat:randPlayerLat, lng:randPlayerLng});

  socket.emit('sendRespawn', respawn);
};

Game.prototype.generatePowerUps = function() {
  //add random powerup to random location
  var randInt, powerUpName, randPlayer, latOffset, lngOffset, randPlayerLat, randPlayerLng, currentTime;
  var range = 0.0001;
  var tolerance = 1000;
  var powerUpCount = 0;
  var randPowerUpTimes = []; //need to fill
  setInterval(function(){
    currentTime = Date.now();
    if (currentTime > randPowerUpTimes[powerUpCount] - tolerance && currentTime < randPowerUpTimes[powerUpCount] + tolerance ) {
      randInt = Math.floor(Math.random() * this.powerUpList.length);
      powerUpName = this.powerUpList[randInt];
      randPlayer = this.players[Object.keys(this.players)[Math.floor(Math.random()*this.playerCount)]];

      latOffset = (Math.random()*range) - (range / 2);
      lngOffset = (Math.random()*range) - (range / 2);
      randPlayerLat = randPlayer.position.lat + latOffset;
      randPlayerLng = randPlayer.position.lng + lngOffset;

      var powerUp = new PowerUp({name:powerUpName,location:{lat:randPlayerLat, lng:randPlayerLng});
      powerUpCount++;

      io.sockets.in(this.roomID).emit('sendPowerUp', powerUp);
    }
  }, 1000);

};

module.exports = Game;
