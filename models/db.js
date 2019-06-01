var mysql = require("mysql");

//local mysql db connection
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '1234qwerasdf',
  database : 'vadi_istanbul'
});

connection.connect(function(err) {
  if (err) throw err;
  else console.log("connected");
});

module.exports = connection;
