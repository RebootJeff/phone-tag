process.env['NODE_ENV'] = 'test';

/**
 * Module dependencies.
 */
var app = require('../../server');
var chai = require('chai');
var should = chai.should();
var expect = chai.expect;
var mongoose = require('mongoose');
var Player = mongoose.model('Player');

//Globals
var player;

//The tests
describe('Player Model', function(){

  beforeEach(function(done){
    player = new Player({
      name: "Ken",
      email: "test@test.com",
      totalScore: 300,
      currentScore: 100,
      deaths: 2,
      wins: 0
    });
    done();
  });

  it('should be able to save without errors', function(done){
    player.save(function(err){
      expect(err).not.exist;
      done();
    });
  });

  it('should be able to update model attributes without errors', function(done){
    player.save();
    player.totalScore = player.totalScore + player.currentScore;
    player.deaths++;
    player.save(function(err){
      expect(err).not.exist;
      expect(player.totalScore).equal(400);
      expect(player.currentScore).equal(100);
      expect(player.deaths).equal(3);
      done();
    });
  });

  afterEach(function(done){
    done();
  });

});
