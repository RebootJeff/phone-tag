var Player = require('./player');

var Game = function(room) {

  this.timeLimit = 10;    //in minutes
  this.loadTime = 10;     //in seconds

  this.roomID = room;

  this.players = {};
  this.playerCount = 0;
  this.playersReady = 0;

  this.gameStarted = false;
  this.gameEnded = false;
  this.startTime = null;
  this.endTime = null;

  this.winners = [];
  this.mapLocation = [];

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
  this.startTime = currentTime;
  this.endTime = this.startTime + loadTime + timeLimit;

  for(var playerName in this.players) {
    player = this.players[playerName];
    playerTimers[player.name] = player.startTime + (currentTime - player.syncTime) + loadTime + timeLimit;
  }
  return playerTimers;
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

Game.prototype.addPowerUp = function() {
  //add random powerup to random location
};

module.exports = Game;
