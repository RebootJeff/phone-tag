var mainController = require('../app/controllers/mainController');

module.exports = function(app){

  // GET
  app.get('/', mainController.index);

};
