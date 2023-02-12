const express = require("express");
const {
  getAllHospital,
  getHospital,
  createHospital,
  updateHospital,
  deleteHospital,
  getHospitalByLocation,
  updateSurgeries,
  updateTests,
  updateDepartments,
  updateDepartmentDoctor
} = require("../controllers/hospitalController");
const router = express.Router();

router.get("/location/:latitude&:longitude", getHospitalByLocation);
// get request
router.get("/", getAllHospital);

// get specific request
router.get("/:id", getHospital);

// post request
router.post("/", createHospital);

// update request
router.patch("/:id", updateHospital);

// delete request
router.delete("/:id", deleteHospital);

// get specific hospital in location

// update the surgeries
router.post("/surgeries/:id", updateSurgeries);

// update the tests
router.post("/tests/:id", updateTests);

// update the departments
router.post("/departments/:id", updateDepartments);

router.post("/departments/doctors/:id&:departmentid", updateDepartmentDoctor);
module.exports = router;
