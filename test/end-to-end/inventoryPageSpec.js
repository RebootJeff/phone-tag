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
      expect(h1Text).equal('Inventory');
      done();
    });
  });

  // TODO: test for window size, link locations, and colors

  // TODO: Change Powerup links
  it('should have "Powerup1" link', function(done){
    client.getAttribute('#Powerup1', 'src', function(err, Powerup1Link){
      expect(Powerup1Link).equal('some/path');
      done();
    });
  });

  it('should have "Powerup2" link', function(done){
    client.getAttribute('#Powerup2', 'src', function(err, Powerup2Link){
      expect(Powerup2Link).equal('some/path');
      done();
    });
  });

  it('should have "Powerup3" link', function(done){
    client.getAttribute('#Powerup3', 'src', function(err, Powerup3Link){
      expect(Powerup3Link).equal('some/path');
      done();
    });
  });

  it('should have "Powerup4" link', function(done){
    client.getAttribute('#Powerup4', 'src', function(err, Powerup4Link){
      expect(Powerup4Link).equal('some/path');
      done();
    });
  });

  it('should have "Powerup5" link', function(done){
    client.getAttribute('#Powerup5', 'src', function(err, Powerup5Link){
      expect(Powerup5Link).equal('some/path');
      done();
    });
  });

  it('should have "Powerup6" link', function(done){
    client.getAttribute('#Powerup6', 'src', function(err, Powerup6Link){
      expect(Powerup6Link).equal('some/path');
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
