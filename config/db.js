const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(process.env.MASTER_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true,
    })
    .then((data) => {
      console.log(`Mongodb connected with server: ${data.connection.host}`);
    }).catch(err => console.log("connection error"+err));
};

module.exports = connectDatabase;
