const config = require('./config.js');
let knex;

if (config.pg) {
  knex = require('knex')({
    client: 'pg',
    connection: config.local ||process.env.DATABASE_URL,
    ssl: true
  });
} else if (config.mySql){
  knex = require('knex')({
    client: 'mysql',
    connection: config.mySql
  });
}

const getAllPosts = (callback) => {
  knex.select().from('posts').leftOuterJoin('users', 'users.user_id', 'posts.user_id')
    .then(data => callback(data))
    .catch(err => callback(err.message));
};

const createPost = (post, callback) => {
  knex('post').insert({
    user_id: post.githubUserId,
    title: post.title,
    code: post.code,
    summary: post.summary,
    anonymous: post.anonymous
  }).then( (data) => {
    console.log('before callback');
    callback(data)
  });
};



module.exports = {
  getAllPosts: getAllPosts,
  createPost: createPost
};
