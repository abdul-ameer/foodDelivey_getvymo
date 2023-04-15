var mysql = require("mysql");


var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ameer',
    database: 'food_delivery'
  });
  

module.exports = con;