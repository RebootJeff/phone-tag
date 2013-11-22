var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: String,
  email: String,
  photoUrl: String,
  lottery: [Schema.betSchema],
  token: String,
  tokenSecret: String
});

mongoose.model('User', userSchema);
