module.exports = {
  production: {
    db: process.env.MONGOLAB_URI,
    facebook: {
      clientID: process.env.facebookID,
      clientSecret: process.env.facebookSecret,
      callbackURL: 'http://hadooken.herokuapp.com/auth/facebook/callback'
    }
  }
};
