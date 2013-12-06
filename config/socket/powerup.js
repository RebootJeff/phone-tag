var PowerUp = function(name, status) {
  this.name = name;
  this.location = {};
  this.status = status;
  this.player = null;
};

PowerUp.prototype.dropPowerUp = function(location) {
  this.location = location;
};

PowerUp.prototype.dead = function() {
  this.isAlive = false;
};

PowerUp.prototype.gameOver = function() {
  this.isActive = false;
};

module.exports = PowerUp;
