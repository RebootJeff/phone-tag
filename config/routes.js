var mainController = require('../app/controllers/mainController');

module.exports = function(app, passport){

  // GET
  app.get('/', mainController.index);
  app.get('/userAuth', mainController.userAuth);
  app.get('/logout', mainController.logout);

  // Special Route For End-To-End Test
  app.get('/superspecialroute', mainController.index);

  // Passport-Facebook
  app.get('/auth/facebook', passport.authenticate('facebook'));
  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/' }));
};
