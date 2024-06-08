const express = require("express");
const {
  createRole,
  updateRole,
  allRoleLists,
  singleRole,
  deleteRole,
} = require("../controllers/roleControllers");
const { isAuth } = require("../middleware/auth");

const router = express.Router();

router.route("/role").post(createRole).put(updateRole).get(allRoleLists);
router.route("/role/:id").get(singleRole).delete(deleteRole);

module.exports = router;
