const mysql = require('mysql2')

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    database: "node_js",
    password: "%w%rs1jW2}XZ5dC?",
})

module.exports = pool.promise()