const express = require("express");
const { registerStudent, studentsList } = require("../controllers/admission-managementControllers");
const {isAuthenticatedUser} = require("../middleware/auth");

const router = express.Router();

var routeNotFound = (req, res, next)=>{
    console.log("hello")
}
router.route("").get(routeNotFound).post(routeNotFound)

// app.get("*", (req, res, next) => {
//     res.status(404).json({
//       message: req.method + " API doesn't exists.",
//       success: false,
//       data: null,
//     });
//   });
module.exports = router;
