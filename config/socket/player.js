var Player = function(socket, playerName, game) {
  this.name = name;
  this.game = game;
  this.location = {};
  this.socketID = socket.id;
  this.score = 0;
  this.team = null;
  this.playerSight = 0;
  this.lat = 0;
  this.lon = 0;
  this.powerUps = {};

  //state variables
  this.isActive = true;
  this.isAlive = true;
  this.canShoot = true;

  //powerup statuses
  this.invisible = false;
  this.invincible = false;

  //game statistics
  this.kills = 0;
  this.deaths = 0;
};

Player.prototype.addPowerUp = function(powerUp) {
  this.powerUps[powerUp];
};

Player.prototype.usePowerUp = function(powerUp) {
  if (this.powerUps[powerUp]){
    this.powerUps[powerUp] = false;
    this[powerUp] = !this[powerUp];
  }
};

Player.prototype.dead = function() {
  this.isAlive = false;
};

Player.prototype.gameOver = function() {
  this.isActive = false;
};

module.exports = Player;
