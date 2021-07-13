const express = require("express");
const { body } = require("express-validator");
const mongoose = require("mongoose");

const AuthUser = require("../middleware/Auth");
const AuthSensor = require("../middleware/Sensor");
const validator = require("../middleware/Validater");
const { sensorSchema } = require("../modules/Sensor");

const Sensor = mongoose.model("Sensor", sensorSchema);

const recordController = require("../controlers/Record");

const router = express.Router();

router.post(
  "/add",
  AuthUser,
  [
    body("temperature").isNumeric().not().isEmpty(),
    body("sensorId")
      .isLength({ min: 5 })
      .not()
      .isEmpty()
      .custom((value) => {
        return Sensor.findOne({ sensorId: value }).then((sensor) => {
          if (!sensor) {
            return Promise.reject("Sensor not available for given Id");
          }
        });
      }),
  ],
  validator,
  AuthSensor,
  recordController.addRecord
);

router.get(
  "/get",
  AuthUser,
  [body("sensorId").isLength({ min: 5 }).not().isEmpty()],
  validator,
  recordController.getRecord
);

module.exports = router;
