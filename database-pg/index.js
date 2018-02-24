const config = require('./config.js');

const knex = require('knex')({
  client: 'pg',
  connection: config.local ||process.env.DATABASE_URL,
  ssl: true
});

const getAllPosts = (callback) => {
  return knex.select().from('post')
    .then(data => callback(data));
    //.catch(err => callback(err.message));
};

const createPost = (post, callback) => {
  return knex('post').insert({
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
