/* import pgPromise from 'pg-promise';

const pgp = pgPromise();
const db = pgp({
    host: 'localhost',
    port: 5432,
    database: 'SIGA',
    user: 'postgres',
    password: 'holasoyelias',
});

export default db; */

import pgPromise from 'pg-promise';
import { Pool } from 'pg';

// Configuración para pg-promise
const pgp = pgPromise();
const db = pgp({
    host: 'localhost',
    port: 5432,
    database: 'SIGA',
    user: 'postgres',
    password: 'holasoyelias',
});

// Configuración para pg.Pool (exclusivo para sesiones)
const sessionPool = new Pool({
    host: 'localhost',
    port: 5432,
    database: 'SIGA',
    user: 'postgres',
    password: 'holasoyelias',
});

export default db;
export { sessionPool }; // Exportamos sessionPool para las sesiones