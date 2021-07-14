const express = require("express");
const { body } = require("express-validator");
const mongoose = require("mongoose");

const validator = require("../middleware/Validater");
const AuthUser = require("../middleware/Auth");

const { sensorSchema } = require("../modules/Sensor");

const Sensor = mongoose.model("Sensor", sensorSchema);

const alertController = require("../controlers/Alert");

const router = express.Router();

router.get(
  "/get",
  AuthUser,
  [body("sensorId").isLength({ min: 5 }).not().isEmpty()],
  validator,
  alertController.getAlert
);

module.exports = router;
