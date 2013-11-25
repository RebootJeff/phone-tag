var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var gameLogSchema = new Schema({
  gameID: Number,
  players: [],
  startTime: Date,
  endTime: Date,
  winner: []
});

mongoose.model('GameLog', gameLogSchema);
