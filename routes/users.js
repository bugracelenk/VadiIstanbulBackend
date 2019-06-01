const express = require("express");
const router = express.Router();

const userControllers = require("../controllers/userControllers");

router
  .post("/login", userControllers.loginUser)
  .post("/signup", userControllers.createNewUser);

module.exports = router;
