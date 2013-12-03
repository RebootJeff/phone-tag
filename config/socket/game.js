var Player = require('./player');

var Game = function(room) {
  this.players = {};
  this.teamCount = 0;
  this.timeLimit = 25;
  this.roomID = room;

  this.winners = [];
  this.mapLocation = [];

};

Game.prototype.addPlayer = function(player){
  this.players[player.name] = player;
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

Game.prototype.startGame = function() {
  //start game timer
};

Game.prototype.endGame = function() {

};

Game.prototype.sendStats = function(data) {

};

Game.prototype.addPowerUp = function() {
  //add random powerup to random location
};

Game.prototype.addPlayer = function(player) {
  this.players[player.name] = player;
};

module.exports = Game;
