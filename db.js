require('dotenv').config()
const mysql = require('mysql2');

const dbConn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: 'test'
})

dbConn.connect(function(err) {
    if (err) throw err;
    console.log("Database Connected!");
  });

module.exports = dbConn;