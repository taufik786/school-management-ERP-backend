const express = require("express");
const {
  createClass,
  updateClass,
  allClassLists,
  singleClass,
  deleteClass,
} = require("../controllers/classesControllers");

const router = express.Router();

router.route("/class").post(createClass).put(updateClass).get(allClassLists);
router.route("/class/:id").get(singleClass).delete(deleteClass);

module.exports = router;
