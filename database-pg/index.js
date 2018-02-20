const config = require('./config');

const knex = require('knex')({
  client: 'pg',
  connection: {
    host: config.HOST,
    user: config.USER,
    password: config.PASSWORD,
    database: config.DATABASE
  }
});


module.exports = {};
