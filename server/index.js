const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const db = require('../database-pg/index');

const app = express();
app.use(express.static(__dirname + '/../app'));
app.use(express.static(__dirname + '/../node_modules'));

app.use(bodyParser.json());

const timer =  24 * 60 * 1000; //hours minutes seconds  //15 * 1000
let refreshCoins = setInterval( () => {
  db.refreshCoins();
}, timer);


app.get('/posts', (req, res) => {
  db.getAllPosts(data => res.json(data));
});

app.get('/test', (req, res) => {
  // wrap this in a promise/async/await
  let postsWithComments = async () => {
    res.json(await db.getPostsWithCommentsAsync());

  };

  postsWithComments();

  // res.json(db.getPostsWithCommentsAsync());  //doesn't work
});

app.get('/comments', (req, res) => {
  let postId = req.query.postId;
  db.getComments(postId, data => res.json(data));
});

app.post('/createPost', (req, res) => {
  console.log('new post: ', req.body);
  db.createPost(req.body, (data, err) => {
    if (err) console.log(err.code);
    res.end();
  });
});

app.post('/createComment', (req, res) => {
  console.log('new comment: ', req.body);
  let comment = req.body;
  // db.getComments(postId, data => res.json(data));
  db.createComment(comment, (data, err) => {
    if (err) console.log(err.code);
    res.end();
  });
});

app.post('/login', async (req, res) => {
  const userInfo = await db.checkCredentials(req.body.username);

  if (userInfo.length) {
    const user = userInfo[0]
    if (bcrypt.compareSync(req.body.password, user.password)) {
      res.status(200).json({
        user_id: user.user_id,
        username: user.username,
        hackcoin: user.hackcoin
      });
    } else {
      res.status(401).send('false password');
    }
  } else {
    res.status(401).send('username doesn\'t exist');
  }
  
});

app.post('/register', async (req, res) => {
  console.log('inside register', req.body.username);
  const shasum = bcrypt.hashSync(req.body.password);
  const data = await db.createUser(req.body.username, shasum);
  if (data === 'already exists') {
    res.status(409).end();
  } else {
    const userInfo = await db.checkCredentials(req.body.username);
    res.status(200).json({
      user_id: userInfo[0].user_id,
      username: userInfo[0].username,
      hackcoin: userInfo[0].hackcoin
    });
  }

});

app.post('/coin', async (req, res) => {
  console.log(req.body);
  let currentHackCoins = await db.checkCoin(req.body.userId);
  console.log('currentHackCoins', currentHackCoins);

  currentHackCoins = currentHackCoins.pop().hackcoin;
  console.log('currentHackCoins', currentHackCoins);
  if(currentHackCoins > 0 && req.body.hackCoins <= currentHackCoins) { //user has usable coins and asking to use a number of some available -- good update db
    await db.subtractCoins(currentHackCoins, req.body.hackCoins, req.body.userId, req.body.commentId);
    res.status(200).end();
  } else if(currentHackCoins > 0 && req.body.hackCoins > currentHackCoins) { //if usable coins but asking to use more than available
    console.log('tried to use too many hack coins');
    res.status(409).end();  //send something in the body for client
  } else if(currentHackCoins <= 0) {  //if no usable coins
    res.status(409).end();  //send something in the body for client
  } else {
    console.log('unexpected edge case', 'currentHackCoins', currentHackCoins,  req.body,);
  }
});

app.post('/solution', async (req, res) => {
  console.log(req.body);
  const data = await db.markSolution(req.body.commentId, req.body.postId);
  res.status(200).end();
});

app.get('*', (req, res) => { res.redirect('/') });

app.listen(process.env.PORT || 3000, function () {
  console.log('listening on port 3000!');
});
