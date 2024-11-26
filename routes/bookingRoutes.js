const express = require("express");
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const { myAppointment, getAllAppointment, getSingleAppointment, bookAppointment } = require("../controllers/bookController");

router.route("/book/new").post(isAuthenticatedUser,bookAppointment);

router
  .route("/appointment/:id")
  .get(isAuthenticatedUser, getSingleAppointment);



router.route("/myappointment").get(isAuthenticatedUser,myAppointment)

router
  .route("/admin/appointment")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllAppointment);






module.exports = router;