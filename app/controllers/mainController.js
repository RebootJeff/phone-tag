var path = require('path');
var rootPath = path.join(__dirname, '../views');

exports.index = function(req, res){
  res.sendfile(rootPath + '/index.html');
};

exports.userAuth = function(req, res){
  res.send(req.isAuthenticated() ? req.user : null );
};

exports.logout = function(req, res){
  req.logout();
  res.send(200);
};
