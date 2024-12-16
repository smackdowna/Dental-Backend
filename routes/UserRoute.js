const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  getUserDetails,
} = require("../controllers/userController");
const { isAuthenticatedUser} = require("../middleware/auth");

const router = express.Router();

//register
router.route("/register").post(registerUser);

//login
router.route("/login").post(loginUser);

//logout
router.route("/logout").get(logout);

//get my profile
router.route("/me").get(isAuthenticatedUser,getUserDetails)


module.exports = router;
