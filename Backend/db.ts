import pgPromise from 'pg-promise';

const pgp = pgPromise();
const db = pgp({
    host: 'localhost',
    port: 5432,
    database: 'SIGA',
    user: 'postgres',
    password: 'holasoyelias',
});

export default db;