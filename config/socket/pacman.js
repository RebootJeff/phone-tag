var PacMan = function(data) {
  this.id = data.id
  this.location = data.location;
  this.direction = data.direction;
  this.duration = null;
};

PacMan.prototype.dropPacMan = function(location) {
  this.location = location;
};

module.exports = PacMan;
