const express = require("express");
const router = express.Router();

const servicesControllers = require("../controllers/servicesControllers");
const checkAuth = require("../middlewares/check_auth");
const checkSaler = require("../middlewares/check_saler");

router
  .get("/", servicesControllers.getServices)
  .get("/:serviceId", servicesControllers.getService)
  .post("/", checkAuth, checkSaler, servicesControllers.createService);

module.exports = router;
