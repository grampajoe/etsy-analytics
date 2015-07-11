var app = require('express')(),
    passport = require('passport'),
    OAuthStrategy = require('passport-oauth').OAuthStrategy,
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    session = require('express-session');

app.use(cookieParser());
app.use(bodyParser());
app.use(session({
  secret: process.env['SESSION_SECRET'] || 'butt',
  cookie: {}
}));
app.use(passport.initialize());
app.use(passport.session());


// OAuth configuration
passport.use(new OAuthStrategy(
  {
    requestTokenURL: 'https://openapi.etsy.com/v2/oauth/request_token?scope=transactions_r',
    accessTokenURL: 'https://openapi.etsy.com/v2/oauth/access_token',
    userAuthorizationURL: 'https://www.etsy.com/oauth/signin',
    consumerKey: process.env['OAUTH_CONSUMER_KEY'] || 'nope',
    consumerSecret: process.env['OAUTH_CONSUMER_SECRET'] || 'nope',
    callbackURL: '/auth/etsy/callback'
  },
  function(token, tokenSecret, profile, done) {
    done(null, {'provider': 'etsy'});
  }
));

passport.serializeUser(function(user, done) {
  done(null, 'user');
});

passport.deserializeUser(function(serialized, done) {
  done(null, {'provider': 'etsy'});
});


app.get('/', function(req, res) {
  res.send('Hello, ' + req.user + '!');
});


app.get('/auth/etsy', passport.authenticate('oauth'));

app.get('/auth/etsy/callback', passport.authenticate('oauth', {
  successRedirect: '/',
  failureRedirect: '/dang'
}));

module.exports = exports = app;
