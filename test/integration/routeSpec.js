process.env['NODE_ENV'] = 'test';

// Dependencies
var app = require('../../server');
var superagent = require('superagent');
var chai = require('chai');
var should = chai.should();
var expect = chai.expect;

// Server tests
describe('< Server Routes Tests >', function(){

  describe('Express Application', function(){
    it('should exist', function(){
      app.should.exist;
    });
  });

  describe('Any users', function(){
    var agent = superagent.agent();

    it('should NOT be able to visit / route', function(done){
      agent.get('http://localhost:3000')
      .end(function(err, res){
        expect(err).not.exist;
        res.status.should.eql(200);
        res.redirects.should.eql([ 'http://localhost:3000/login' ]);
        done();
      });
    });

    it('should be able to visit /login route', function(done){
      agent.get('http://localhost:3000/login')
      .end(function(err, res){
        expect(err).not.exist;
        res.status.should.eql(200);
        done();
      });
    });
  });

});
