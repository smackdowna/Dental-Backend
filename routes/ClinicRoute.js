const express = require("express");
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const {
  createClinic,
  getAllClinic,
  getAClinic,
  deleteClinic,
  UpdateClinic,
} = require("../controllers/clinicController");

router
  .route("/clinic/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createClinic);

router.route("/allclinic").get(getAllClinic);
router
  .route("/clinic/:clinicId")
  .get(getAClinic)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteClinic)
  .put(isAuthenticatedUser, authorizeRoles("admin"), UpdateClinic);



module.exports = router;
