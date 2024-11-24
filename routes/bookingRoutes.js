const express = require("express");
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const { bookappointment, myAppointment, getAllAppointment, getSingleAppointment } = require("../controllers/bookController");

router.route("/book/new").post(isAuthenticatedUser, bookappointment);

router
  .route("/appointment/:id")
  .get(isAuthenticatedUser, getSingleAppointment);



router.route("/myappointment").get(isAuthenticatedUser,myAppointment)

router
  .route("/admin/appointment")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllAppointment);






module.exports = router;