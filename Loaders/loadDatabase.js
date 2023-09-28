const mysql = require('mysql');

/**
 * 
 * @returns mysql.Connection
 */
module.exports = async () => {

    let db = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'disc_bot'
    })

    return db
}