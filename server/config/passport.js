var mongoose = require('mongoose');
var Player = mongoose.model('Player');

module.exports = function(passport, FacebookStrategy, credentials){
  
  // passport session serialization
  passport.serializeUser(function (player, done) {
    done(null, player);
  });

  passport.deserializeUser(function (player, done) {
    done(null, player);
  });

  passport.use(new FacebookStrategy({
    clientID: credentials.facebook.clientID,
    clientSecret: credentials.facebook.clientSecret,
    callbackURL: credentials.facebook.callbackURL
  }, function(accessToken, refreshToken, profile, done){
    console.log(profile);
    Player.findOrCreate({ "facebookID": profile.id }, function(err, player){
      player.name = profile.displayName;
      player.save();
      done(null, player);
    });
  }
  ));
};
