const knex = require('knex');
const config = require('../Config/DatabaseUsers');

const DB = knex(config);

module.exports = DB;
