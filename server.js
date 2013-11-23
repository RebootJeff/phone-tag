/**
 * Module dependencies.
 */

var express = require('express');
var path = require('path');
var fs = require('fs');
var mongoose = require('mongoose');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

var app = express();
var env = process.env['NODE_ENV'] || 'development';
var credentials;

switch(env){
  case "development":
    credentials = require('./config/credentials')[env];
    break;
  case "test":
    credentials = require('./config/credentials')[env];
    break;
  case "production":
    credentials = require('./config/productionCredentials')[env];
    break;
}

// models
var models_path = __dirname + '/app/models'
fs.readdirSync(models_path).forEach(function(file){
  if (~file.indexOf('.js')) require(models_path + '/' + file);
});

// passport-facebook
require('./config/passport')(passport, FacebookStrategy, credentials);

// app environment configuration
require('./config/environments')(app, passport);

// routes
require('./config/routes')(app, passport);

// database connection
mongoose.connect(credentials.db);

// development only
if( app.get('env') === 'development' ) {
  app.use(express.errorHandler());
}

// runs the server
var port = process.env.PORT || 3000;
console.log("Express application is listening to port", port);
module.exports = app;
app.listen(port);
