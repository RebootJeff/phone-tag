var mongoose = require('mongoose');
var Player = mongoose.model('Player');

exports.index = function(req, res){
  console.log(req.user);
  res.render('index', {
    player: req.user
  });
};
