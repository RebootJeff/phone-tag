var PowerUp = function(name, location, playerName) {
  this.name = name
  this.location = location;
  this.playerName = playerName;
};

PowerUp.prototype.dropPowerUp = function(location) {
  this.location = location;
};

module.exports = PowerUp;
