const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const config = require("config");
const app = express();

const environmentVariable = require("./adapters/environmentVariables");

const Auth = require("./routes/Auth");
const User = require("./routes/User");
const Sensor = require("./routes/Sensor");
const Record = require("./routes/Record");
const Alert = require("./routes/Alert");

app.set("view engine", "ejs");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/html"));
app.use(express.static(__dirname + "/uploads/profileImages"));

app.use("/api/auth", Auth);
app.use("/api/user", User);
app.use("/api/sensor", Sensor);
app.use("/api/record", Record);
app.use("/api/alert", Alert);

mongoose.connect(
  environmentVariable.databaseConnectionString,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  (err) => {
    if (err) return console.log(err);

    console.log("database connection stablish...");
  }
);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("server running in port " + port);
});
