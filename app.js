const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const errorMiddleware = require("./middleware/error");


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route Imports
const user = require("./routes/user.routes");
const schoolRoutes = require("./routes/school.routes");

app.use("/api/v1", user);
app.use("/api/v1", schoolRoutes);

app.use(errorMiddleware);

module.exports = app;
