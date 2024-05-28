const express = require("express");
const { registerStudent, studentsList, studentDetails, updateStudent } = require("../controllers/admission-managementControllers");
const {isAuthenticatedUser} = require("../middleware/auth");

const router = express.Router();

router.route("/register-student").post(registerStudent).put(updateStudent)
router.route("/students").get(studentsList)
router.route("/students-details/:id").get(studentDetails)

module.exports = router;
