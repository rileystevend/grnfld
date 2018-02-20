const config = require('./config');

const knex = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL || config.URL,
  ssl: true
});


module.exports = {};
