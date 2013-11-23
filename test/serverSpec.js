process.env['NODE_ENV'] = 'test';

// Dependencies
var app = require('../server');
var chai = require('chai');
var should = chai.should();
var expect = chai.expect;

// Server tests
describe('< Server Tests >', function(){

  describe('Express Application', function(){
    it('should exist', function(){
      expect(app).exist;
    });
  });

});
