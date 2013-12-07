var Player = require('./player');
var PowerUp = require('./powerup');

var Game = function(id) {

  this.timeLimit = 2;    //in minutes
  this.loadTime = 2;     //in seconds

  this.gameID = id;

  this.players = {};
  this.playerCount = 0;
  this.playersReady = 0;

  this.gameStarted = false;
  this.gameEnded = false;
  this.initTime = null;
  this.startTime = null;
  this.endTime = null;

  this.winners = [];
  this.mapLocation = [];
  this.powerUpList = ['invisible', 'invincible'];

  this.pacman = {};

};

Game.prototype.addPlayer = function(player){
  this.players[player.name] = player;
  this.playerCount++;
};

Game.prototype.removePlayer = function(playerName){
  delete this.players[playerName];
  this.playerCount--;
  return this;
};

Game.prototype.startGame = function(){
  var player;
  var playerTimers = {};
  var timeLimit = this.timeLimit * 60 * 1000;
  var loadTime = this.loadTime * 1000;
  var currentTime = Date.now();

  this.gameStarted = true;
  this.initTime = currentTime;
  this.startTime = this.initTime + loadTime;
  this.endTime = this.initTime + loadTime + timeLimit;

  for(var playerName in this.players) {
    player = this.players[playerName];
    playerTimers[player.name] = player.startTime + (currentTime - player.syncTime) + loadTime + timeLimit;
  }

  // this.generatePowerUps();
  // this.generatePacman();

  return playerTimers;
};


Game.prototype.endGame = function(){
  this.gameEnded = true;
};

Game.prototype.updateLocations = function(){
  var currentLocations = {};
  for(var playerName in this.players){
    currentLocations[playerName] = this.players[playerName].location;
  }
  return currentLocations;
};

Game.prototype.getGameID = function(){
  return this.gameID;
};

Game.prototype.getPlayer = function(playerName) {
  return this.players[playerName];
};

Game.prototype.generateRespawn = function(player) {
  var latOffset, lngOffset, playerLat, playerLng, socket;
  var range = 0.0001;

  latOffset = (Math.random()*range) - (range / 2);
  lngOffset = (Math.random()*range) - (range / 2);
  playerLat = player.location.lat + latOffset;
  playerLng = player.location.lng + lngOffset;

  return new PowerUp({name:'respawn',location:{lat:playerLat, lng:playerLng}, playerName: player.name});
};

Game.prototype.generatePowerUps = function() {
  var randInt, dropTime, powerUp, powerUpName, randPlayer, latOffset, lngOffset, randPlayerLat, randPlayerLng, currentTime;

  var that = this;
  var range = 0.001;
  var tolerance = 1000;
  var powerUpCount = 0;
  var randPowerUpTimes = [];
  var timeBetweenDrops = 0.5;  //min
  var maxDrops = Math.floor((this.timeLimit - 1) / timeBetweenDrops);

  // for (var i = 1; i < this.timeLimit - 1; i+=timeBetweenDrops){
  //   dropTime = this.startTime + Math.random() * (timeBetweenDrops * 60 * 1000);
  //   randPowerUpTimes.push(dropTime);
  // }
  // var droptime = this.startTime + 5000;
  // setInterval(function(){
  //   currentTime = Date.now();
  //   console.log('powerup should be added');
  //   console.log('randpoweruptime[powerupcount] is',randPowerUpTimes[powerUpCount]);
  //   console.log('currentTime is:', currentTime);
    // if (powerUpCount < maxDrops && currentTime > randPowerUpTimes[powerUpCount] - tolerance && currentTime < randPowerUpTimes[powerUpCount] + tolerance ) {
    // if (currentTime > droptime + 1000) {
      randInt = Math.floor(Math.random() * that.powerUpList.length);
      powerUpName = that.powerUpList[randInt];
      randPlayer = that.players[Object.keys(that.players)[Math.floor(Math.random()*that.playerCount)]];

      latOffset = (Math.random()*range) - (range / 2);
      lngOffset = (Math.random()*range) - (range / 2);
      randPlayerLat = randPlayer.location.lat + latOffset;
      randPlayerLng = randPlayer.location.lng + lngOffset;

      powerUp = new PowerUp({id:powerUpCount, name:powerUpName, location:{lat:randPlayerLat, lng:randPlayerLng}, playerName:null});
      powerUpCount++;
      return powerUp;
      // io.sockets.in(that.gameID).emit('sendPowerUp', powerUp);
    // }
  // }, 1000);

};

Game.prototype.sendStats = function(data) {

};

Game.prototype.generatePacman = function() {
  var player = this.players[Object.keys(this.players)[Math.floor(Math.random() * this.playerCount)]];
  var location = player.location;
  var offset = 0.001;
  var directions = ['left', 'right'];
  var latOffset, lngOffset, direction;

  // var that = this;
  // var counter = 0;
  // var tolerance = 1000;
  // var randPacmanTimes = [];
  // var timeBetweenDrops = 0.5;  //min
  // var maxDrops = Math.floor((this.timeLimit - 1) / timeBetweenDrops);

  // for (var i = 1; i < this.timeLimit - 1; i+=timeBetweenDrops){
  //   dropTime = this.startTime + Math.random() * (timeBetweenDrops * 60 * 1000);
  //   randPacmanTimes.push(dropTime);
  // }

  // setInterval(function(){
  //   currentTime = Date.now();
  //   console.log('pacman should be added');
  //   if (currentTime > randPacmanTimes[counter] - tolerance && currentTime < randPacmanTimes[counter] + tolerance ) {
      latOffset = Math.random() * offset * 2 - offset / 2;
      lngOffset = Math.random() * offset * 2 - offset / 2;
      direction = Math.floor(Math.random()*directions.length);

      this.pacman.lat = location.lat + latOffset;
      this.pacman.lng = location.lng + lngOffset;
      this.pacman.direction = directions[direction];
      // io.sockets.in(that.gameID).emit('addPacmanToMap', that.pacman);
      // counter++;
  //   }
  // }, 1000);
  return this.pacman;
};


module.exports = Game;
