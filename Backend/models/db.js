// backend/models/db.js
const pgp = require('pg-promise')();
const db = pgp({
    host: 'localhost',
    port: 5432,
    database: 'SIGA',
    user: 'postgres',
    password: 'holasoyelias',
});

module.exports = db;