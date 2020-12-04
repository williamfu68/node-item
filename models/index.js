var mysql = require('mysql');

function query(sql, options) {
    return new Promise(function(resolve, reject) {
        var conn = mysql.createConnection({
            host: '127.0.0.1',
            user: 'root',
            password: '',
            database: 'goods',
            port: 3306
        })
        conn.connect();
        conn.query(sql, options, function(err, data) {
            if (err) {
                return reject(err);
            }
            resolve(data);
        });
        conn.end();
    })
}

module.exports = query;