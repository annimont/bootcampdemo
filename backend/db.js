const pgp = require('pg-promise')();
const db = pgp ({
    host: 'localhost',
    port: 5432,
    database: 'demo',
    user: 'postgres',
    password: 'codebootcamp'
});

module.exports = db;