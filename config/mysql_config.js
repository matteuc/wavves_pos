var dotenv = require("dotenv");

var mysqlConfig = {
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.MYSQL_SECRET,
    database: "wavves_db"
};

module.exports = mysqlConfig;