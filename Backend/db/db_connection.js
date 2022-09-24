const { Client } = require('pg');

const client = new Client({
  host: '54.242.163.111',
  port: '5432',
  user: 'admintest',
  password: 'pjdtest',
  database: 'admin',
});

exports.connection = client;
