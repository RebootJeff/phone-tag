var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = function(passport, FacebookStrategy, credentials){

  // passport session serialization
  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    done(null, user);
  });

  passport.use(new FacebookStrategy({
    clientID: credentials.facebook.clientID,
    clientSecret: credentials.facebook.clientSecret,
    callbackURL: credentials.facebook.callbackURL
  }, function(accessToken, refreshToken, profile, done){
    console.log(profile);
    User.findOrCreate({ "facebookID": profile.id }, function(err, user){
      user.name = profile.displayName;
      user.save();
      done(null, user);
    });
  }
  ));
};
