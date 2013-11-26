var client = require('./client').client;
var chai = require('chai');
var expect = chai.expect;

describe('Index page Test', function(){
  before(function(done) {
    client.init().url('http://localhost:3000/superspecialroute');
    done();
  });

  // TODO: May not want title
  it('should have correct title', function(done){
    client.getTitle(function(err, title){
      expect(title).equal("phoneTag");
      done();
    });
  });

  it('should have the correct heading', function(done){
    client.getText('h1', function(err, h1Text){
      expect(h1Text).equal('Home');
      done();
    });
  });

  // TODO: test for window size, link locations, and colors

  it('should have "Join" link', function(done){
    client.getText('#join', function(err, joinLink){
      expect(joinLink).equal('Join');
      done();
    });
  });

  it('should have "Leaderboard" link', function(done){
    client.getText('#leaderboard', function(err, leaderboard){
      expect(leaderboard).equal('Leaderboard');
      done();
    });
  });

  it('should have "logout" link', function(done){
    client.getText('#logout', function(err, logout){
      expect(logout).equal('Logout');
      done();
    });
  });

  after(function(done) {
    client.end(done);
  });
});
