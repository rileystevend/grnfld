const express = require('express');
const passport = require('passport');
const GithubStrategy = require('passport-github').Strategy;
const bodyParser = require('body-parser');
const session = require('express-session');
const config = require('./config.js');

const db = require('../database-pg/index');
const jwt = require('jwt-simple');

const app = express();
app.use(express.static(__dirname + '/../app'));
app.use(express.static(__dirname + '/../node_modules'));
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(session({
  secret: 'keyboard dog',
  cookie: {
    maxAge: 600000
  },
  resave: false,
  saveUninitialized: true
}));
app.set('view engine', 'html');

//require github users (github user model)
//var Github_User = require('./app/mode')
// var items = require('../database-pg');

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

passport.use(new GithubStrategy({
  clientID: config.clientID,
  clientSecret: config.clientSecret,
  callbackURL: "http://127.0.0.1:3000/auth/github/callback"
},
  function (accessToken, refreshToken, profile, callback) {
    callback(null, profile);
  }
));


app.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));

app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  function (req, res) {
    const payload = req.user;
    const secret = config.clientSecret;
    const token = jwt.encode(payload, secret);
    res.redirect(`/token/${token}/`);
  }
);

app.get('/posts', (req, res) => {
  res.json(req.body)
  // db.getAllPosts(data => res.json(data));

});

app.listen(process.env.PORT || 3000, function () {
  console.log('listening on port 3000!');
});

app.post('/createPost', jsonParser, (req, res) => {
  console.log('inside createpost');
  console.log(req.body);
  db.createPost(req.body, (data) => {
    console.log(data);
    res.end();
  });
});