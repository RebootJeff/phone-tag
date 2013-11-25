var mongoose = require('mongoose');
var User = mongoose.model('User');
var path = require('path');
var rootPath = path.join(__dirname, '../views');

exports.index = function(req, res){
  res.sendfile(rootPath + '/index.html');
};

exports.login = function(req, res){
  res.sendfile(rootPath + '/login.html');
};
