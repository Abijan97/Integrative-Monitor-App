const mongoose = require("mongoose");
const { sensorSchema } = require("../modules/Sensor");

const Sensor = mongoose.model("Sensor", sensorSchema);

module.exports = (req, res, next) => {
  Sensor.findOne({ sensorId: req.body.sensorId })
    .then((sensor) => {
      if (sensor) {
        req.body.thresholdValue = sensor.thresholdValue;
        req.body.userEmail = sensor.userEmail;
        next();
      } else {
        return res.status(500).json({
          data: null,
          error: "No sensor found",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        data: null,
        error: "No sensor found",
      });
    });
};
