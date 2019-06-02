const express = require("express");
const router = express.Router();

const userControllers = require("../controllers/userControllers");
const checkAuth = require("../middlewares/check_auth");
router
  .post("/login", userControllers.loginUser)
  .post("/signup", userControllers.createNewUser)
  .post("/update", checkAuth ,userControllers.updateProfile);

module.exports = router;
