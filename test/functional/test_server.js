var expect = require('chai').expect,
    request = require('request'),
    helpers = require('./helpers');

describe('server', function() {
  var url = helpers.startServer();

  it('should be listening on a port', function(done) {
    request(url, function(err, response) {
      expect(response).to.be.ok;
      done();
    });
  });

  describe('/', function() {
    it('should return a 200', function(done) {
      request(url, function(error, response) {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
  });
});
