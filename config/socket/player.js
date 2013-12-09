var Player = function(socket, playerName, game) {
  this.name = playerName;
  this.game = game;
  this.location = {};
  this.socketID = socket.id;
  this.team = null;
  this.playerSight = 0;
  this.lat = 0;
  this.lon = 0;
  this.powerUps = {};

  //state variables
  this.isActive = true;
  this.alive = true;
  this.canShoot = true;

  //powerup statuses
  this.invisible = false;
  this.invincible = false;

  //game statistics
  this.kills = 0;
  this.deaths = 0;
  this.totalTags = 0;

  this.powerUpDuration = 10000;
};

Player.prototype.addPowerUp = function(powerUpName) {
  if (this.powerUps[powerUpName]){
    this.powerUps[powerUpName]++;
  } else {
    this.powerUps[powerUpName] = 1;
  }
};

Player.prototype.usePowerUp = function(powerUpData) {
  var that = this;
  if (this.powerUps[powerUpData.name]){
    this.powerUps[powerUpData.name]--;
    this[powerUpData.name] = true;
    setTimeout(function(){
      that[powerUpData.name] = false;
      that.socketID.emit('powerUpExpired', {powerUp: powerUpData.name});
    }, that.powerUpDuration);
  }
};

Player.prototype.dead = function() {
  this.isAlive = false;
};

Player.prototype.gameOver = function() {
  this.isActive = false;
};

Player.prototype.isTaggable = function() {
  return this.isActive && this.isAlive && !this.invincible;
};

module.exports = Player;
