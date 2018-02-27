const config = require('./config.js');
let knex;

if (config.mySql) {
  knex = require('knex')({
    client: 'mysql',
    connection: config.mySql
  });
} else {
  knex = require('knex')({
    client: 'pg',
    connection: config.local ||process.env.DATABASE_URL,
    ssl: true
  });
}

const getAllPosts = ( (callback) => {
  knex.select().from('posts')
      .leftOuterJoin('users', 'users.user_id', 'posts.user_id')
    .then(data => callback(data))
    .catch(err => callback(err.message));
});

const getComments = (postId, callback) => {
  knex.select().from('comments')
      .where('post_id', postId)
    .then(data => callback(data))
    .catch(err => callback(err.message));
};

//using async/await
const getAllPostsPromise = () => {
  return new Promise(function(resolve, reject) {

  })
};
async function getPostsWithCommentsAsync() {
  //get all posts with username
  const posts = await knex.select().from('posts')
      .leftOuterJoin('users', 'users.user_id', 'posts.user_id');

  //returns posts with a comment array inside each post object
  return Promise.all(posts.map(async (post, index, posts) => {
    //get all comments for the selected post_id
    const comments = await knex.select().from('comments')
        .where('post_id', post.post_id);
    post.comments = comments;
    return post;
  }));
}

const createPost = (post, callback) => {
  knex('posts').insert({
    user_id: post.githubUserId,
    title: post.title,
    code: post.code,
    summary: post.summary,
    anon: post.anonymous
  }).then( (data) => {
    console.log('before callback');
    callback(data)
  });
};

module.exports = {
  getAllPosts: getAllPosts,
  createPost: createPost,
  getComments: getComments,
  getPostsWithCommentsAsync: getPostsWithCommentsAsync
};
