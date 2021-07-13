const mongoose = require("mongoose");

const { sensorSchema } = require("../modules/Sensor");

const Sensor = mongoose.model("Sensor", sensorSchema);

exports.addSensor = async (req, res) => {
  try {
    const { thresholdValue, sensorId } = req.body;
    const { userEmail } = req.user;

    const sensor = new Sensor({
      thresholdValue,
      userEmail,
      sensorId,
    });

    const result = await sensor.save();

    return res.status(200).json({
      isAdded: true,
      data: result,
      error: null,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

exports.getSensor = async (req, res) => {
  Sensor.findOne({ sensorId: req.body.sensorId })
    .then((sensor) => {
      if (sensor) {
        return res.status(200).json({
          data: sensor,
          error: null,
        });
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
