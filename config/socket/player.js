var Player = function(socket, user, room) {
  this.name = user;
  this.room = room;
  this.location = {};
  this.socketID = socket.id;
  this.score = 0;
  this.team = null;
  this.playerSight = 0;
  this.lat = 0;
  this.lon = 0;

  //state variables
  this.isActive = true;
  this.isAlive = true;
  this.canShoot = true;
  this.isVisible = true;
  this.isInvincible = false;
  this.hasDecoy = false;

  //game statistics
  this.kills = 0;
  this.deaths = 0;
};

Player.prototype.addPowerUp = function(powerUp) {
  this.powerUp = powerUp;
};

Player.prototype.dead = function() {
  this.isAlive = false;
};

Player.prototype.gameOver = function() {
  this.isActive = false;
};

module.exports = Player;
