const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const cors = require("cors");

const errorMiddleware = require("./src/middleware/error");

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// Route Imports
const user = require("./src/routes/user.routes");
const schoolRoutes = require("./src/routes/school.routes");
const admissionManagementRoutes = require("./src/routes/admission-management.routes");
const notFoundRoutes = require("./src/routes/notFound.routes");

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
