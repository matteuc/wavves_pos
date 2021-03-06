// Set up MySQL connection.
var mysql = require("mysql");
var mysqlConfig = require("./mysql_config");

var connection;
if(process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  connection = mysql.createConnection(mysqlConfig);
}

// Make connection.
connection.connect(function(err) {
  if (err) {
    console.error("There was an error connecting: " + err.stack);
    return;
  }
  console.log("Client connected as ID " + connection.threadId);
});

// Export connection for our ORM to use.
module.exports = connection;
