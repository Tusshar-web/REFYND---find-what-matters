const path = require('path');
const mySql = require('mysql2');

require('dotenv').config({path: path.resolve(__dirname, './.env')})  

const db = mySql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

module.exports = db;