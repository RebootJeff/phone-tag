var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var playerSchema = new Schema({
  username: String,
  email: String,
  photoUrl: String,
  totalScore: Integer,
  currentScore: Integer,
  deaths: Integer,
  wins: Integer
});

mongoose.model('Player', playerSchema);
