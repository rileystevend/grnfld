const config = require('./config');

const knex = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL || config.URL,
  ssl: true
});

const getAllPosts = () => {
  return knex.select().from('post');
}

module.exports = {
  getAllPosts: getAllPosts
};
