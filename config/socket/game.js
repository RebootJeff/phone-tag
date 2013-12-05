var Game = function(room) {

  this.timeLimit = 2;    //in minutes
  this.loadTime = 5;     //in seconds

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
  this.powerUp = {};
  this.powerUp.name = null;
  this.powerUp.lat = null;
  this.powerUp.lng = null;

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
