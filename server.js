const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

app.listen(()=>console.log(`Server running on port: 5000`))