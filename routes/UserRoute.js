const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
} = require("../controllers/userController");

const router = express.Router();

//register
router.route("/register").post(registerUser);

//login
router.route("/login").post(loginUser);

//logout
router.route("/logout").get(logout);
module.exports = router;
