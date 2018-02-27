const config = require('./config.js');
let knex;

if (config.pg) {
  knex = require('knex')({
    client: 'pg',
    connection: config.local ||process.env.DATABASE_URL,
    ssl: true
  });
} else {
  knex = require('knex')({
    client: 'mysql',
    connection: {
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'grnfld'
    }
  });
}

const getAllPosts = (callback) => {
  knex.select().from('posts')
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
  }).then(data => callback(data));
};

module.exports = {
  getAllPosts: getAllPosts,
  createPost: createPost
};