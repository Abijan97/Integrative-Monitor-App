const mongoose = require("mongoose");

const { alertSchema } = require("../modules/Alert");

const Alert = mongoose.model("Alert", alertSchema);

exports.getAlert = async (req, res) => {
  Alert.find({ sensorId: req.body.sensorId })
    .then((alert) => {
      if (alert) {
        return res.status(200).json({
          data: alert,
          error: null,
        });
      } else {
        return res.status(500).json({
          data: null,
          error: "No alert found",
        });
      }
    })
    .catch((err) => {
      return res.status(500).json({
        data: null,
        error: "No alert found",
      });
    });
};
