const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const db = require('../database-pg/index');

const app = express();
app.use(express.static(__dirname + '/../app'));
app.use(express.static(__dirname + '/../node_modules'));

app.use(bodyParser.json());

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
  db.createPost(req.body, (data) => {
    res.end();
  });
});

app.post('/createComment', (req, res) => {
  console.log('new post: ', req.body);
  let comment = req.body;
  // db.getComments(postId, data => res.json(data));
  db.createComment(comment, (data) => {
    console.log('sent from server to db comment!');
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
        username: user.username
      });
    } else {
      res.status(401).send('false password');
    }
  } else {
    res.status(401).send('username doesn\'t exist');
  }
  
});

app.post('/register', async (req, res) => {
  const shasum = bcrypt.hashSync(req.body.password);
  const data = await db.createUser(req.body.username, shasum);
  if (data === 'already exists') {
    res.status(409).end();
  } else {
    const userInfo = await db.checkCredentials(req.body.username);
    res.status(200).json({
      user_id: userInfo[0].user_id,
      username: userInfo[0].username
    });
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
