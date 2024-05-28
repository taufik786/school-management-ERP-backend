const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const cors = require("cors");

const errorMiddleware = require("./middleware/error");

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware to check valid HTTP methods
// app.use((req, res, next) => {
//     console.log("kkk")
//     const allowedMethods = ['GET', 'PUT', 'POST', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'];
//     if (!allowedMethods.includes(req.method)) {
//       return res.status(400).send("Bad request: Invalid HTTP method");
//     }
//     next();
//   });

// Route Imports
const user = require("./routes/user.routes");
const schoolRoutes = require("./routes/school.routes");
const admissionManagementRoutes = require("./routes/admission-management.routes");
const notFoundRoutes = require("./routes/notFound.routes");

app.use("/api/v1", user);
app.use("/api/v1", schoolRoutes);
app.use("/api/v1", admissionManagementRoutes);

// IF API DOES NOT EXIST - GLOBAL WILDCARD
app.use((req, res) => {
  res.status(404).json({
    message: "Bad request: Invalid HTTP method",
    success: false,
    apiName: req.url,
    apiType: req.method,
    data: null,
  });
});
app.use(errorMiddleware);

module.exports = app;
