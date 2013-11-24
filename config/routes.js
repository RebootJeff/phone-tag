var mainController = require('../app/controllers/mainController');
var middlewares = require('./middlewares');

module.exports = function(app, passport){

  // GET
  app.get('/', middlewares.authorize, mainController.index);
  app.get('/login', mainController.login);
  app.get('/logout', mainController.logout);

  // Passport-Facebook
  app.get('/auth/facebook', passport.authenticate('facebook'));
  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/login' }));
};
