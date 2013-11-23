var mongoose = require('mongoose');
var Player = mongoose.model('Player');

exports.index = function(req, res){
  res.render('index', {
    player: req.user
  });
};

exports.login = function(req, res){
  res.render('login');
};

exports.logout = function(req, res){
  req.logout();
  res.redirect('/login');
};
