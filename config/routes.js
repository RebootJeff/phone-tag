var mainController = require('../app/controllers/mainController');
var authorization = require('./middleware/authorization');

module.exports = function(app, passport){

  // GET
  app.get('/', authorization.authorize, mainController.index);
  app.get('/login', mainController.login);
  app.get('/logout', mainController.logout);

  // Special Route For End-To-End Test
  app.get('/superspecialroute', mainController.index);

  // Passport-Facebook
  app.get('/auth/facebook', passport.authenticate('facebook'));
  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/login' }));
};
