const { Pool } = require('pg');

const pool = new Pool({
    host: 'dpg-curt0bofnakc73esion0-a.oregon-postgres.render.com',
    port: '5432',
    ssl: true,
    database: 'waffle_test',
    user: 'waffle_test_user',
    password: 'HZDQhgAVe5GkycZBYBRLv3KNoKCo6tCI'
})

//PGPASSWORD=HZDQhgAVe5GkycZBYBRLv3KNoKCo6tCI psql -h dpg-curt0bofnakc73esion0-a.oregon-postgres.render.com -U waffle_test_user waffle_test

pool.connect()
.then(() => console.log("Conectado ao PostgreSQL!"))
.catch((err) => console.error("Erro ao conectar ao banco:", err));

module.exports = pool;
