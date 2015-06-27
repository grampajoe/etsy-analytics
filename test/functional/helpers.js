var app = require('../../lib/app');

// Sets up a server if necessary, and returns a URL for testing.
module.exports.startServer = function() {
  var port = process.env['PORT'] || 3000,
      host = process.env['HOST'];

  before(function() {
    if (!host) {
      this.server = app.listen(port);
    }
  });

  after(function() {
    if (this.server) {
      this.server.close();
    }
  });

  return 'http://' + (host || 'localhost') + ':' + port;
};
