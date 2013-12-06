var PowerUp = function(name, location, player) {
  this.name = name;
  this.location = location;
  this.player = player;
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
