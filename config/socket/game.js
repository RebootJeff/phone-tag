var Game = function(room) {
  this.players = [];
  this.teamCount = 0;
  this.timeLimit = 25;

  this.winners = [];
  this.mapLocation = [];

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
  this.players.push(player);
};
