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
  var serviceId;
  var images = [];

  sql.beginTransaction(err => {
    if (err) return result(err, null);
    else {
      sql.query(
        "INSERT INTO services SET ?",
        [serviceData.data],
        (err, res) => {
          if (err) return result(err, null);

          serviceId = res.insertId;
          serviceData.images.map(image => {
            images.push([image.image, image.purpose, serviceId]);
          });
          sql.query(
            "INSERT INTO images(image, purpose, connect_id) VALUES ?",
            [images],
            (err, res) => {
              if (err) {
                sql.query("DELETE FROM services WHERE name = ?", [serviceData.data.name], (err, res) => {
                  if(err) return result(err, null);
                  else return result(err, null);
                })
              };
              sql.commit(err => {
                if (err) return result(err, null);

                console.log("Transaction completed");
                result(null, "Transaction completed");
              });
            }
          );
        }
      );
    }
  });
};

exports.getSalerId = (id, result) => {
  sql.query("SELECT saler_id FROM services WHERE id = ?", [id], (err, res) => {
    if (err) result(err, null);
    else result(null, res);
  });
};
