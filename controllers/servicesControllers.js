const Service = require("../models/Service");

exports.getServices = (req, res, next) => {
  Service.getServices((err, result) => {
    if (err) return res.status(500).json({ error: err });
    else {
      res.status(200).json(result);
    }
  });
};

exports.getService = (req, res, next) => {
  Service.getService(req.params.serviceId, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    else {
      res.status(200).json(result);
    }
  });
};

exports.createService = (req, res, next) => {
  Service.createService(req.body.serviceData, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    else {
      res.status(200).json(result);
    }
  });
};
