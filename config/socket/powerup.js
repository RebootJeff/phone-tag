var PowerUp = function(data) {
  this.id = data.id
  this.name = data.name
  this.location = data.location;
  this.playerName = data.playerName;
  this.radius = data.name === 'respawn' ? 25 : 15;
};

PowerUp.prototype.dropPowerUp = function(location) {
  this.location = location;
};

module.exports = PowerUp;
