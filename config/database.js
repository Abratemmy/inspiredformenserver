

const mysql = require('mysql');
const dotenv = require("dotenv");

dotenv.config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    dialect: 'mysql',
    port: 3306,
    logging: true, // Set to true to see SQL queries in console
    define: {
        freezeTableName: true,
        timestamps: true
    },
});
module.exports = db;
