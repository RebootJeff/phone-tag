var client = require('./client').client;
var chai = require('chai');
var expect = chai.expect;

describe('Main Homepage Test', function(){
  before(function(done) {
    client.init().url('http://localhost:3000/', done);
  });

  it('should see the correct title', function(done) {
    client.getTitle(function(err, title){
      expect(title).equal('phoneTag');
      done();
    });
  });

  after(function(done) {
    client.end();
    done();
  });
});
