var express = require('express');
var passport = require('passport');
var GithubStrategy = require('passport-github').Strategy;
var bodyParser = require('body-parser');
var session = require('express-session');

//require github users (github user model)
//var Github_User = require('./app/mode')
var items = require('../database-pg');


passport.use(new GithubStrategy({
    clientID: process.env.  GITHUB_CLIENT_ID || '0830e094214ee729f7a7',
    clientSecret: process.env.GITHUB_CLIENT_SECRET || 'a5193849b09b9bc3238d9836774a419d8e36035',
    callbackURL: "http://localhost:3000/auth/github/callback" /*http://grnfld.herokuapp.com/auth/github/callback*/
  }, 
  function (accessToken, refreshToken, profile, cb) {
    //utilize user.findeOrCreate() to pull user database data and render user-specific info.
    console.log(accessToken, refreshToken, profile);
  }));

passport.serializeUser(function(user, done) {
  console.log(user)
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null,obj);
});

var app = express();

app.use(express.static(__dirname + '/../app'));
app.use(express.static(__dirname + '/../node_modules'));
app.use(require('body-parser').urlencoded({ extended: true}));
app.use(require('express-session')({secret: 'keyboard cat', resave: true, saveUninitialized: true}));

app.use(passport.initialize());
app.use(passport.session());


app.get('/', (req, res) => {
  console.log('aslkdjfl');
})

app.get('/auth/github',
    passport.authenticate('github')
    );
  

app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/' }),
  function(req, res) {
    console.log('WTFFFFFFFF')
    // Successful authentication, redirect home.
    req.session.isAuthenticated = true;
    res.redirect('/auth/github');
  });



app.listen(process.env.PORT || 3000, function() {
  console.log('listening on port 3000!');
});

