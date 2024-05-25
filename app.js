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

// Route Imports
const user = require("./routes/user.routes");
const schoolRoutes = require("./routes/school.routes");
const admissionManagementRoutes = require("./routes/admission-management.routes");

app.use("/api/v1", user);
app.use("/api/v1", schoolRoutes);
app.use("/api/v1", admissionManagementRoutes);

app.use(errorMiddleware);

module.exports = app;
