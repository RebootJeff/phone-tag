var mainController = require('../controllers/mainController');

module.exports = function(app){

  // GET
  app.get('/', mainController.index);

};
