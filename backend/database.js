const mysql = require('mysql2');

const connection = mysql.createConnection({
    host:'ballast.proxy.rlwy.net',
    user:'root',
    port:'44697',
    password:'CJACzYiuRQopSNVEQUzejabshBmROTly',
    database:'railway'
});

//mysql://root:CJACzYiuRQopSNVEQUzejabshBmROTly@ballast.proxy.rlwy.net:44697/railway

connection.connect((err) => {
    if(err) {
        console.log('erro ao conectar com o banco:', err);
        return;
    }

    console.log('sucesso ao conectar com o banco:');
});

module.exports = connection;