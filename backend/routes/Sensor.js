const express = require("express");
const { body } = require("express-validator");
const mongoose = require("mongoose");

const AuthUser = require("../middleware/Auth");
const validator = require("../middleware/Validater");
const { sensorSchema } = require("../modules/Sensor");

const Sensor = mongoose.model("Sensor", sensorSchema);

const sensorController = require("../controlers/Sensor");

const router = express.Router();

router.post(
  "/add",
  AuthUser,
  [
    body("thresholdValue").isNumeric().not().isEmpty(),
    body("sensorId")
      .isLength({ min: 5 })
      .not()
      .isEmpty()
      .custom((value) => {
        return Sensor.findOne({ sensorId: value }).then((sensor) => {
          if (sensor) {
            return Promise.reject("Sensor Id already exsist");
          }
        });
      }),
  ],
  validator,
  sensorController.addSensor
);

router.get(
  "/get",
  AuthUser,
  [
    body("sensorId")
      .isLength({ min: 5 })
      .not()
      .isEmpty()
      .custom((value) => {
        return Sensor.findOne({ sensorId: value }).then((sensor) => {
          if (sensor) {
            return Promise.reject("Sensor Id already exsist");
          }
        });
      }),
  ],
  sensorController.getSensor
);

module.exports = router;
