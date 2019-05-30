//importing packages
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");

port = process.env.PORT || 3000;

// connection configurations
var mc = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234qwerasdf",
  database: "vadi_istanbul"
});

// connect to database
mc.connect();

//start listening port
app.listen(port, () => console.log("API server started on: " + port));

//express configurations
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//adding routes

routes(app); //register the route
