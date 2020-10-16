const knex = require('knex');
const knexStringcase = require('knex-stringcase');

const environment = process.env.NODE_ENV || 'development';
const config = require('../knexfile.js')[environment];

module.exports = knex( knexStringcase(config) );
