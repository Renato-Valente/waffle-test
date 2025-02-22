const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    ssl: true,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
})

pool.connect()
.then(() => console.log("Conectado ao PostgreSQL!"))
.catch((err) => console.error("Erro ao conectar ao banco:", err));

module.exports = pool;
