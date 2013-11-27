var mongoose = require('mongoose');
var User = mongoose.model('User');

exports.index = function(req, res){
  res.render('index');
};

exports.userAuth = function(req, res){
  res.send(req.isAuthenticated() ? req.user : null );
};

exports.logout = function(req, res){
  req.logout();
  res.redirect('/');
};
