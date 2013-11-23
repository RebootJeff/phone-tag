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
      expect(app).exist;
    });
  });

  describe('Any users', function(){
    var agent = superagent.agent();

    it('should NOT be able to visit / route', function(done){
      agent.get('http://localhost:3000')
      .end(function(err, res){
        expect(err).not.exist;
        expect(res.status).equal(302);
        expect(res.redirects).equal([ 'http://localhost:3000/login' ]);
        done();
      });
    });

    it('should be able to visit /login route', function(done){
      agent.get('http://localhost:3000/login')
      .end(function(err, res){
        expect(err).not.exist;
        expect(res.status).equal(200);
        done();
      });
    });
  });

});
