const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'leonardo',
    password: '',
    database: 'leiloeiro'
});

db.connect((err) => {
    if(err) throw err;
});

module.exports = db;