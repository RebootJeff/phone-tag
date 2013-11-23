var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var gameSchema = new Schema({
  gameID: Number,
  players: [Schema.playerSchema],
  startTime: Date,
  endTime: Date,
  winner: [Schema.playerSchema]
});

mongoose.model('Game', gameSchema);
