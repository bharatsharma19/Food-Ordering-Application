var mysql = require("mysql");

var pool = mysql.createConnection({
  host: "localhost",
  port: 3306,
  database: "foodie",
  user: "root",
  password: "",
  multipleStatements: true,
});

module.exports = pool;

// Bharat Sharma
