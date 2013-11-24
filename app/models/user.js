var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findOrCreate');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  facebookID: Number,
  name: String,
  email: String,
  photoUrl: String,
  totalScore: Number,
  currentScore: Number,
  deaths: Number,
  wins: Number
});

userSchema.plugin(findOrCreate);
mongoose.model('User', userSchema);
