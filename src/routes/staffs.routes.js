const express = require("express");
const {
  createStaff,
  updateStaff,
  allStaffLists,
  singleStaff,
  deleteStaff,
} = require("../controllers/staffsControllers");

const router = express.Router();

router.route("/staff").post(createStaff).put(updateStaff).get(allStaffLists);
router.route("/staff/:id").get(singleStaff).delete(deleteStaff);

module.exports = router;
