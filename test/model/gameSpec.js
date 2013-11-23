process.env['NODE_ENV'] = 'test';

/**
 * Module dependencies.
 */
var app = require('../../server');
var chai = require('chai');
var should = chai.should();
var expect = chai.expect;
var mongoose = require('mongoose');
var Game = mongoose.model('Game');

//Globals
var game;

//The tests
describe('Game Model', function(){

  beforeEach(function(done){
    game = new Game({
      gameID: 1,
      players: [],
      startTime: new Date(),
      endTime: new Date(),
      winner: []
    });
    done();
  });

  it('should be able to save without errors', function(done){
    game.save(function(err){
      expect(err).not.exist;
      done();
    });
  });

  it('should be able to update model attributes without errors', function(done){
    game.save();
    game.players.push({ name: "Ken", deaths: 3 });
    game.save(function(err){
      expect(err).not.exist;
      expect(game.players.length).equal(1);
      expect(game.startTime).exist;
      expect(game.endTime).exist;
      expect(game.winner.length).equal(0);
      done();
    });
  });

  afterEach(function(done){
    done();
  });

});
