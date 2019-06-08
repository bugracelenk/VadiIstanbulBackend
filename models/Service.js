const sql = require("./db");

exports.getService = (id, result) => {
  sql.query("SELECT * FROM services WHERE id = ?", [id], (err, res) => {
    if (err) result(err, null);
    else result(null, res);
  });
};

exports.getServices = result => {
  sql.query("SELECT * FROM services", (err, res) => {
    if (err) result(err, null);
    else result(null, res);
  });
};

exports.createService = (serviceData, result) => {
  sql.query("INSERT INTO services SET ?", [serviceData], (err, res) => {
    if (err) result(err, null);
    else result(null, res);
  });
};

exports.getSalerId = (id, result) => {
  sql.query("SELECT saler_id FROM services WHERE id = ?", [id], (err, res) => {
    if (err) result(err, null);
    else result(null, res);
  });
};
