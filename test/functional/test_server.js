var expect = require('chai').expect,
    app = require('../../lib/app'),
    host = process.env['HOST'],
    port = process.env['PORT'],
    request = require('request');

describe('server', function() {
  var url = 'http://' + (host || 'localhost') + ':' + (port || 3000),
      server;

  before(function() {
    // Create a test server if we need to
    if (!host) {
      server = app.listen(port || 3000);
    }
  });

  after(function() {
    // Tear down any test server
    if (server) {
      server.close();
    }
  });

  it('should be listening on a port', function(done) {
    request(url, function(error, response) {
      expect(response).to.not.be.undefined;
      done();
    });
  });

  describe('/', function() {
    it('should return a 200', function(done) {
      request(url, function(error, response) {
        if (error) { throw error; }
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
  });
});
