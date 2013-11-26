var client = require('./client').client;
var chai = require('chai');
var expect = chai.expect;

describe('Login page Test', function(){
  before(function(done) {
    client.init().url('http://localhost:3000/', done);
  });

  it('should redirect to login page', function(done){
    client.url(function(err, urlResult){
      expect(urlResult.value).equal('http://localhost:3000/login');
      done();
    });
  });

  // TODO: May not want title
  it('should see the correct title', function(done) {
    client.getTitle(function(err, title){
      expect(title).equal('phoneTag');
      done();
    });
  });

  it('should have the correct heading', function(done){
    client.getText('h1', function(err, h1Text){
      expect(h1Text).equal('Tag');
      done();
    });
  });

  // TODO: test for window size, link locations, and colors

  it('should have "Login with Facebook" link', function(done){
    client.getText('#facebook', function(err, facebookLink){
      expect(facebookLink).equal('Login with Facebook');
      done();
    });
  });

  it('should have "Login with Twitter" link', function(done){
    client.getText('#twitter', function(err, twitterLink){
      expect(twitterLink).equal('Login with Twitter');
      done();
    });
  });

  after(function(done) {
    client.end(done);
  });
});
