const express = require("express");
const { addSchool, editSchool, allSchoolLists, deleteSchool, singleSchool } = require("../controllers/schoolControllers");

const router = express.Router();

router.route("/school").post(addSchool).put(editSchool).get(allSchoolLists);
router.route("/school/:id").delete(deleteSchool).get(singleSchool);

module.exports = router;
