const config = require('./config');

const knex = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL || config.URL,
  ssl: true
});

const getAllPosts = (callback) => {
  return knex.select().from('post')
    .then(function(data) {
      console.log(data)
      callback(data)
    })
    .catch(err => callback(err.message));
}

module.exports = {
  getAllPosts: getAllPosts
};
