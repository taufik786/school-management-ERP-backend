const express = require("express");
const { registerStudent } = require("../controllers/admission-managementControllers");
const {isAuthenticatedUser} = require("../middleware/auth");

const router = express.Router();

router.route("/register-student").post(registerStudent)

module.exports = router;
