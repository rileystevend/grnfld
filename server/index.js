const express = require('express');
const passport = require('passport');
const GithubStrategy = require('passport-github').Strategy;
const bodyParser = require('body-parser');
const session = require('express-session');
const clientSecret = require('./config.js').clientSecret;
const db = require('../database-pg/index');


//require github users (github user model)
//var Github_User = require('./app/mode')
// var items = require('../database-pg');

const app = express();

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null,obj);
});

passport.use(new GithubStrategy({
    clientID: '0830e094214ee729f7a7',
    clientSecret: clientSecret,
    callbackURL: "http://localhost:3000/auth/github/callback" /*process.env.GITHUB_CLIENT_SECRET process.env.  GITHUB_CLIENT_ID || ||  http://grnfld.herokuapp.com/auth/github/callback*/ 
  }, 
  function (accessToken, refreshToken, profile, callback) {
    //pull ID and username from profile and save to database using knex(?)
    console.log(accessToken, refreshToken, profile);
    
    callback();
  }));





app.use(express.static(__dirname + '/../app'));
app.use(express.static(__dirname + '/../node_modules'));
app.use(require('body-parser').urlencoded({ extended: true}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/github',
    passport.authenticate('github')
    );
  

app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/' }),
  function(req, res) {
// Successful authentication, redirect home.
  req.session.isAuthenticated = true;
  res.redirect('/');
});

app.get('/', (data) => {
  console.log('here')
  db.getAllPosts.then(data => console.log(data));
  res.end()
})

app.listen(process.env.PORT || 3000, function() {
  console.log('listening on port 3000!');
});

