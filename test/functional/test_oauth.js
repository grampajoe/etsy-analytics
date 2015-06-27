var app = require('../../lib/app'),
    expect = require('chai').expect,
    request = require('request'),
    helpers = require('./helpers');

describe('oauth', function() {
  var url = helpers.startServer(),
      consumerKey = process.env['OAUTH_CONSUMER_KEY'],
      consumerSecret = process.env['OAUTH_CONSUMER_SECRET'];

  describe('/auth/etsy', function() {
    it('should initiate an authorization request', function(done) {
      if (!consumerKey || !consumerSecret) {
        this.skip('No OAuth keys found.');
      }

      request({
        url: url + '/auth/etsy',
        followRedirect: false
      },
      function(err, response) {
        expect(response).to.be.ok;
        expect(response.statusCode).to.equal(302);
        expect(response.headers['location']).to.have.string(
          'etsy.com/oauth/signin'
        );
        done();
      });
    });
  });
});
