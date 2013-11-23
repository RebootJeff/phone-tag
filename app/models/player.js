var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findOrCreate');
var Schema = mongoose.Schema;

var playerSchema = new Schema({
  facebookID: Number,
  name: String,
  email: String,
  photoUrl: String,
  totalScore: Number,
  currentScore: Number,
  deaths: Number,
  wins: Number
});

playerSchema.plugin(findOrCreate);
mongoose.model('Player', playerSchema);
