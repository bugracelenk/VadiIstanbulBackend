//importing packages
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");

//importing routes

const userRoutes = require("./routes/users");

port = process.env.PORT || 3010;

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

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use("/api/users", userRoutes);
