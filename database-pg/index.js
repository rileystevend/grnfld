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
    connection: process.env.DATABASE_URL,
    ssl: true
  });
}
const getAllPosts = (callback) => {
  knex.column(knex.raw('posts.*, users.username')).select()
    .from(knex.raw('posts, users'))
    .where(knex.raw('posts.user_id = users.user_id'))
    .orderBy('post_id', 'desc')
    .then(data => callback(data))
    .catch(err => callback(err.message));
};

const getComments = (postId, callback) => {
  knex.column(knex.raw('comments.*, users.username')).select()
    .from(knex.raw('comments, users'))
    .where(knex.raw(`comments.post_id = ${postId} and comments.user_id = users.user_id`))
    .then(data => callback(data))
    .catch(err => callback(err.message));
};

//using async/await
//currently not used
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
    user_id: post.userId,
    title: post.title,
    code: post.codebox,
    summary: post.description,
    anon: false //hard coded to false until functionality implemented
  }).then(data => callback(data, null))
    .catch(err => callback(null, err));
};

const createComment = (comment, callback) => {
  knex('comments').insert({
    user_id: comment.user_id,
    post_id: comment.post_id,
    message: comment.message
  }).orderBy('comment_id', 'asc')
    .then(data => callback(data, null))
    .catch(err => callback(null, err));
};

const checkCredentials = async (username) => {
  return await knex.select().from('users')
    .where(knex.raw(`LOWER(username) = LOWER('${username}')`));
};

const createUser = async (username, password) => {
  const query = await knex.select().from('users')
    .where(knex.raw(`LOWER(username) = LOWER('${username}')`));

  if (query.length) {
    return 'already exists';
  } else {
    return await knex('users').insert({ username: username, password: password});
  }
};

const markSolution = async (commentId, postId) => {
  await knex('posts').where('post_id', postId).update('solution_id', commentId);
};

const checkCoin = async (userId) => {
  return await knex.select('hackcoin').from('users').where('user_id', userId);
};

const subtractCoins = async (currenthackcoin, subtractinghackcoin, userId, commentId) => {
  await knex('users').where('user_id', userId).update('hackcoin', currenthackcoin - subtractinghackcoin)
  await knex('comments').where('comment_id', commentId).increment('votes', subtractinghackcoin)  //update votes by amount of hackcoins subtracted
};

const refreshCoins = async () => {
  await knex('users').update('hackcoin', 5);
};

module.exports = {
  getAllPosts: getAllPosts,
  createPost: createPost,
  getComments: getComments,
  getPostsWithCommentsAsync: getPostsWithCommentsAsync,
  checkCredentials: checkCredentials,
  createUser: createUser,
  createComment: createComment,
  markSolution: markSolution,
  checkCoin: checkCoin,
  subtractCoins: subtractCoins,
  refreshCoins: refreshCoins
};
