var Player = function(socket, user) {
  this.socket = socket;
  this.user = user;
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

};

Player.prototype.setLocation = function(lat, lon) {
  this.lat = lat;
  this.lon = lon;
};

Player.prototype.setPowerup = function(powerUp) {
  switch (powerUp) {
    case 'invincible':
      this.isInvincible = true;
      this.duration = 10;
      break;
    default:
      console.log('I am DEFAULT!');
  }
};

Player.prototype.dead = function() {
  this.isAlive = false;
};

Player.prototype.gameOver = function() {
  this.isActive = false;
};
