const express = require("express");
const {
  addSchool,
  editSchool,
  allSchoolLists,
  deleteSchool,
  singleSchool,
} = require("../controllers/schoolControllers");
const { isAuth } = require("../middleware/auth");

const router = express.Router();

router.route("/school").post(isAuth, addSchool).put(editSchool).get(allSchoolLists);
router.route("/school/:id").delete(deleteSchool).get(singleSchool);

module.exports = router;
