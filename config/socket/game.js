var Player = require('./player');
var PowerUp = require('./powerup');
var PacMan = require('./pacman');

var Game = function(id, io) {

  this.timeLimit = 10;    //in minutes
  this.loadTime = 2;     //in seconds

  this.io = io;
  this.gameID = id;

  this.players = {};
  this.playerCount = 0;
  this.playersReady = 0;

  this.gameStarted = false;
  this.gameEnded = false;
  this.initTime = null;
  this.startTime = null;
  this.endTime = null;

  this.powerUpCount = 0;

  this.winners = [];
  this.mapLocation = [];
  this.powerUpList = ['invisible', 'invincible'];

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

  this.generatePowerUps();
  this.generatePacman();

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
  var latOffset, lngOffset, playerLat, playerLng, respawn;
  var range = 0.0001;

  latOffset = (Math.random()*range) - (range / 2);
  lngOffset = (Math.random()*range) - (range / 2);
  playerLat = player.location.lat + latOffset;
  playerLng = player.location.lng + lngOffset;

  respawn = new PowerUp({id:this.powerUpCount , name:'respawn',location:{lat:playerLat, lng:playerLng}, playerName: player.name});
  this.powerUpCount++;
  return respawn;
};

Game.prototype.generatePowerUps = function() {
  var randInt, dropTime, powerUp, powerUpName, randPlayer, latOffset, lngOffset, randPlayerLat, randPlayerLng, currentTime;

  var that = this;
  var range = 0.001;
  var tolerance = 1000;
  var randPowerUpTimes = [];
  var timeBetweenDrops = 0.5;  //min
  var maxDrops = Math.floor((this.timeLimit - 1) / timeBetweenDrops);

  for (var i = timeBetweenDrops / 2; i < this.timeLimit - 1 - timeBetweenDrops / 2; i+=timeBetweenDrops){
    dropTime = this.startTime + ((i + Math.random() * timeBetweenDrops) * 60 * 1000);
    randPowerUpTimes.push(dropTime);
  }

  setInterval(function(){
    currentTime = Date.now();
    if (that.powerUpCount < maxDrops && currentTime > randPowerUpTimes[that.powerUpCount] - tolerance && currentTime < randPowerUpTimes[that.powerUpCount] + tolerance ) {
      randInt = Math.floor(Math.random() * that.powerUpList.length);
      powerUpName = that.powerUpList[randInt];
      randPlayer = that.players[Object.keys(that.players)[Math.floor(Math.random()*that.playerCount)]];

      latOffset = (Math.random()*range) - (range / 2);
      lngOffset = (Math.random()*range) - (range / 2);
      randPlayerLat = randPlayer.location.lat + latOffset;
      randPlayerLng = randPlayer.location.lng + lngOffset;

      powerUp = new PowerUp({id:that.powerUpCount, name:powerUpName, location:{lat:randPlayerLat, lng:randPlayerLng}, playerName:null});
      that.powerUpCount++;
      that.io.sockets.in(that.gameID).emit('sendPowerUp', powerUp);
    }
  }, 1000);
};

Game.prototype.generatePacman = function() {
  var player = this.players[Object.keys(this.players)[Math.floor(Math.random() * this.playerCount)]];
  var location = player.location;
  var range = 0.001;
  var directions = ['left', 'right'];
  var latOffset, lngOffset, randInt, pacLat, pacLng, direction, pacMan;

  var that = this;
  var pacmanCount = 0;
  var tolerance = 1000;
  var randPacmanTimes = [];
  var timeBetweenDrops = 0.5;  //min
  var maxDrops = Math.floor((this.timeLimit - 1) / timeBetweenDrops);
  for (var i = timeBetweenDrops / 2; i < this.timeLimit - 1 - timeBetweenDrops / 2; i+=timeBetweenDrops){
    dropTime = this.startTime + ((i + Math.random() * timeBetweenDrops) * 60 * 1000);
    randPacmanTimes.push(dropTime);
  }

  setInterval(function(){
    currentTime = Date.now();
    if (pacmanCount < maxDrops && currentTime > randPacmanTimes[pacmanCount] - tolerance && currentTime < randPacmanTimes[pacmanCount] + tolerance ) {
      latOffset = Math.random() * range * 2 - range / 2;
      lngOffset = Math.random() * range * 2 - range / 2;
      randInt = Math.floor(Math.random()*directions.length);

      pacLat = location.lat + latOffset;
      pacLng = location.lng + lngOffset;
      direction = directions[randInt];

      pacMan = new PacMan({id:pacmanCount, location:{lat:pacLat, lng:pacLng}, direction:direction});
      pacmanCount++;
      that.io.sockets.in(that.gameID).emit('addPacmanToMap', pacMan);
    }
  }, 1000);
};

Game.prototype.sendStats = function(data) {

};


module.exports = Game;
