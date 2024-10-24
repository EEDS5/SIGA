// backend/models/db.js
const pgp = require('pg-promise')();
const db = pgp({
    host: 'localhost',
    port: 5432,
    database: 'mecanica',
    user: 'postgres',
    password: 'root',
});

module.exports = db;
