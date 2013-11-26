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
      expect(h1Text).equal('Leaderboard');
      done();
    });
  });

  // TODO: test for window size, link locations, and colors

  // TODO: Check for graph displays, color, location, and size
  it('should have "Overall" link', function(done){
    client.getAttribute('#overall', 'src' function(err, overall){
      expect(overall).equal('some/path');
      done();
    });
  });

  it('should have "Month" link', function(done){
    client.getAttribute('#month', 'src', function(err, month){
      expect(month).equal('some/path');
      done();
    });
  });

  it('should have "Week" link', function(done){
    client.getAttribute('#week', 'src', function(err, week){
      expect(week).equal('some/path');
      done();
    });
  });

  it('should have "Day" link', function(done){
    client.getAttribute('#day', 'src', function(err, day){
      expect(day).equal('some/path');
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
