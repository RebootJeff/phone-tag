var Game = function(room) {
  this.players = {};
  this.teamCount = 0;
  this.timeLimit = 25;
  this.roomID = room;

  this.winners = [];
  this.mapLocation = [];
  this.powerUp = {};
  this.powerUp.name = null;
  this.powerUp.lat = null;
  this.powerUp.lng = null;

};

Game.prototype.addPlayer = function(player){
  this.players[player.name] = player;
};

Game.prototype.removePlayer = function(playerName){
  delete this.players[playerName];
  return this;
}

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

Game.prototype.generatePowerUp = function(powerUp, randomLat, randomLng) {
  //add random powerup to random location
  this.powerUp.name = powerUp;

  var offset = 0.0025;
  var sign = [true, false];
  var latOffset, lngOffset, randomIndex, randomSign;

  randomIndex = Math.floor(Math.random() * sign.length);
  randomSign = sign[randomIndex];
  randomSign ? latOffset = offset : latOffset = -1 * offset;
  randomIndex = Math.floor(Math.random() * sign.length);
  randomSign = sign[randomIndex];
  randomSign ? lngOffset = offset : lngOffset = -1 * offset;

  this.powerUp.lat = randomLat + latOffset;
  this.powerUp.lng = randomLng + lngOffset;

  return this;
};

module.exports = Game;
