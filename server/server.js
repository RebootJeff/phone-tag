/**
 * Module dependencies.
 */

var express = require('express');
var path = require('path');

var app = express();
var env = process.env['NODE_ENV'] || 'development';

// development only
if( app.get('env') === 'development' ) {
  app.use(express.errorHandler());
}

// runs the server
var port = process.env.PORT || 3000;
console.log("Express application is listening to port", port);
module.exports = app;
app.listen(port);
