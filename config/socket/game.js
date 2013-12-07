var Player = require('./player');
var PowerUp = require('./powerup');

var Game = function(id) {

  this.timeLimit = 1;    //in minutes
  this.loadTime = 5;     //in seconds

  this.gameID = id;

  this.players = {};
  this.playerCount = 0;
  this.playersReady = 0;

  this.gameStarted = false;
  this.gameEnded = false;
  this.initTime = null;
  this.startTime = null;
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

Game.prototype.getGameID = function(){
  return this.gameID;
};

Game.prototype.getPlayer = function(playerName) {
  return this.players[playerName];
};

Game.prototype.generateRespawn = function(player) {
  var latOffset, lngOffset, playerLat, playerLng, socket;
  var range = 0.0001;

  latOffset = (Math.random()*range) - (range / 2);
  lngOffset = (Math.random()*range) - (range / 2);
  playerLat = player.position.lat + latOffset;
  playerLng = player.position.lng + lngOffset;

  return new PowerUp({name:'respawn',location:{lat:randPlayerLat, lng:randPlayerLng}, playerName:playerName);
};

Game.prototype.generatePowerUps = function() {
  var randInt, dropTime, powerUp, powerUpName, randPlayer, latOffset, lngOffset, randPlayerLat, randPlayerLng, currentTime;

  var that = this;
  var range = 0.0001;
  var tolerance = 1000;
  var powerUpCount = 0;
  var randPowerUpTimes = [];
  var timeBetweenDrops = 2;  //min
  var maxDrops = Math.floor((timeLimit - 1) / timeBetweenDrops);

  for (var i = 1; i < timeLimit - 1; i+=timeBetweenDrops){
    dropTime = this.startTime + Math.random() * (timeBetweenDrops * 60 * 1000);
    randPowerUpTimes.push(dropTime);
  }

  setInterval(function(){
    currentTime = Date.now();
    if (powerUpCount < maxDrops && currentTime > randPowerUpTimes[powerUpCount] - tolerance && currentTime < randPowerUpTimes[powerUpCount] + tolerance ) {
      randInt = Math.floor(Math.random() * that.powerUpList.length);
      powerUpName = that.powerUpList[randInt];
      randPlayer = that.players[Object.keys(that.players)[Math.floor(Math.random()*that.playerCount)]];

      latOffset = (Math.random()*range) - (range / 2);
      lngOffset = (Math.random()*range) - (range / 2);
      randPlayerLat = randPlayer.position.lat + latOffset;
      randPlayerLng = randPlayer.position.lng + lngOffset;

      powerUp = new PowerUp({name:powerUpName,location:{lat:randPlayerLat, lng:randPlayerLng}, playerName:null});
      powerUpCount++;

      io.sockets.in(that.gameID).emit('sendPowerUp', powerUp);
    }
  }, 1000);

};

Game.prototype.sendStats = function(data) {

};

module.exports = Game;
