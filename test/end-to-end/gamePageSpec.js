var client = require('./client').client;
var chai = require('chai');
var expect = chai.expect;

describe('Index page Test', function(){
  before(function(done) {
    // TODO: Correct the game route
    client.init().url('http://localhost:3000/#game');
    done();
  });

  // TODO: May not want title
  it('should have correct title', function(done){
    client.getTitle(function(err, title){
      expect(title).equal("phoneTag");
      done();
    });
  });

  // TODO: May want to change heading
  it('should have the correct heading', function(done){
    client.getText('h1', function(err, h1Text){
      expect(h1Text).equal('Game');
      done();
    });
  });

  // TODO: test for window size, link locations, and colors

  it('should have "Tag" link', function(done){
    client.getText('#tag', function(err, tagLink){
      expect(tagLink).equal('Join');
      done();
    });
  });

  // TODO: Test for Google map display, zoom-in, zoom-out, and blinking effect

  after(function(done) {
    client.end(done);
  });
});
